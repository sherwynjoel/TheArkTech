import "dotenv/config";
import ftp from "basic-ftp";
import { existsSync, statSync } from "node:fs";

const {
    FTP_HOST,
    FTP_USER,
    FTP_PASS,
    FTP_REMOTE_DIR = "/public_html",
    FTP_ALLOW_UNVERIFIED_TLS,
} = process.env;

// Hostinger's FTP server presents a certificate for *.hstgr.io, so connecting
// by IP or by thearktech.in fails verification. Setting FTP_HOST to the
// srv####.hstgr.io hostname from hPanel gives a fully verified connection.
// Until then, FTP_ALLOW_UNVERIFIED_TLS=1 keeps the transport encrypted but
// skips server-identity checks — weaker than verified TLS, far stronger than
// plain FTP, which sends the password in clear text.
const allowUnverified = FTP_ALLOW_UNVERIFIED_TLS === "1";

async function deploy() {
    if (!FTP_HOST || !FTP_USER || !FTP_PASS) {
        console.error("Missing FTP_HOST, FTP_USER, or FTP_PASS in .env");
        process.exit(1);
    }
    if (!existsSync("dist/index.html")) {
        console.error("No dist/index.html — run `npm run build` first.");
        process.exit(1);
    }

    const built = statSync("dist/index.html").mtime;
    console.log(`Uploading dist/ (built ${built.toLocaleString()}) to ${FTP_REMOTE_DIR}`);

    const client = new ftp.Client(0);
    client.ftp.verbose = false;
    let uploaded = 0;
    client.trackProgress((info) => {
        if (info.type === "upload" && info.name) {
            uploaded += 1;
            process.stdout.write(`\r  ${uploaded} files uploaded — ${info.name.slice(0, 48)}`.padEnd(78));
        }
    });

    try {
        if (allowUnverified) {
            console.warn(
                "WARNING: FTP_ALLOW_UNVERIFIED_TLS=1 — traffic is encrypted but the\n" +
                "server's identity is NOT verified. Set FTP_HOST to the srv####.hstgr.io\n" +
                "hostname from hPanel to remove this warning."
            );
        }

        // FTPS always. Never fall back to plain FTP — that would put the
        // password on the wire in clear text.
        await client.access({
            host: FTP_HOST,
            user: FTP_USER,
            password: FTP_PASS,
            secure: true,
            secureOptions: allowUnverified ? { rejectUnauthorized: false } : {},
        });
        console.log(`Connected over FTPS${allowUnverified ? " (unverified)" : " (verified)"}.`);

        // Mirror the whole build. Uploading a hand-picked subset silently
        // skipped fonts/, why/, logo.png, banner.png and robots.txt for months.
        await client.ensureDir(FTP_REMOTE_DIR);
        await client.uploadFromDir("dist");

        client.trackProgress();
        console.log(`\nDeployment complete — ${uploaded} files uploaded.`);
    } catch (err) {
        client.trackProgress();
        console.error(`\nFTP error: ${err.message}`);
        if (/certificate|altnames/i.test(err.message)) {
            console.error(
                "The TLS certificate did not match the host you connected to.\n" +
                "Fix: set FTP_HOST in .env to the srv####.hstgr.io hostname shown in\n" +
                "hPanel under Files -> FTP Accounts.\n" +
                "Workaround: re-run with FTP_ALLOW_UNVERIFIED_TLS=1 (encrypted, unverified)."
            );
        } else if (/secure|TLS|SSL|AUTH/i.test(err.message)) {
            console.error(
                "The server refused the FTPS handshake. Check whether Hostinger offers\n" +
                "FTPS/SFTP for this account. Do not switch to plain FTP — it sends the\n" +
                "password unencrypted."
            );
        }
        process.exitCode = 1;
    } finally {
        client.close();
    }
}

deploy();
