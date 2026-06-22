import ftp from "basic-ftp";

async function deploySingle() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "145.79.209.109",
            user: "u107134759.thearktech.in",
            password: "@Tn99v4233",
            secure: false
        });
        console.log("Connected to FTP server.");
        
        await client.cd("/");
        await client.cd("portfolio");
        
        console.log("Deploying devaseafood.png...");
        await client.uploadFrom("dist/portfolio/devaseafood.png", "devaseafood.png");
        
        console.log("Deployment complete.");
    } catch(err) {
        console.log("FTP error:", err);
    }
    client.close();
}
deploySingle();
