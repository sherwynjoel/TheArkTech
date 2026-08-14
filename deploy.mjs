import "dotenv/config";
import ftp from "basic-ftp";

const { FTP_HOST, FTP_USER, FTP_PASS } = process.env;

async function deploy() {
    if (!FTP_HOST || !FTP_USER || !FTP_PASS) {
        console.error("Missing FTP_HOST, FTP_USER, or FTP_PASS in .env");
        process.exit(1);
    }

    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: FTP_HOST,
            user: FTP_USER,
            password: FTP_PASS,
            secure: false
        });
        console.log("Connected to FTP server.");

        console.log("Deploying _astro...");
        await client.ensureDir("_astro");
        await client.uploadFromDir("dist/_astro");

        await client.cd("/public_html");
        console.log("Deploying index.html...");
        await client.uploadFrom("dist/index.html", "index.html");

        await client.cd("/public_html");
        console.log("Deploying portfolio...");
        await client.ensureDir("portfolio");
        await client.uploadFromDir("dist/portfolio");

        console.log("Deployment complete.");
    } catch(err) {
        console.log("FTP error:", err);
    }
    client.close();
}
deploy();
