import "dotenv/config";
import ftp from "basic-ftp";

const { FTP_HOST, FTP_USER, FTP_PASS } = process.env;

async function deploySingle() {
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

        await client.cd("/");
        await client.cd("portfolio");

        console.log("Deploying devaseafood.webp...");
        await client.uploadFrom("dist/portfolio/devaseafood.webp", "devaseafood.webp");

        console.log("Deployment complete.");
    } catch(err) {
        console.log("FTP error:", err);
    }
    client.close();
}
deploySingle();
