import "dotenv/config";
import ftp from "basic-ftp";

const { FTP_HOST, FTP_USER, FTP_PASS } = process.env;

async function deploy() {
    if (!FTP_HOST || !FTP_USER || !FTP_PASS) {
        console.error("Missing FTP_HOST, FTP_USER, or FTP_PASS in .env");
        process.exit(1);
    }

    const client = new ftp.Client();
    try {
        await client.access({
            host: FTP_HOST,
            user: FTP_USER,
            password: FTP_PASS,
            secure: true
        });
        console.log("Connected to FTP server.");
        await client.cd("/public_html");

        for (const dir of ["_astro", "portfolio", "contact", "terms", "privacy"]) {
            console.log(`Deploying ${dir}/...`);
            await client.ensureDir(dir);
            await client.uploadFromDir(`dist/${dir}`);
            await client.cd("/public_html");
        }

        for (const file of ["index.html", "404.html", "sitemap-index.xml", "sitemap-0.xml"]) {
            console.log(`Deploying ${file}...`);
            await client.uploadFrom(`dist/${file}`, file);
        }

        console.log("Deployment complete.");
    } catch(err) {
        console.log("FTP error:", err);
    }
    client.close();
}
deploy();
