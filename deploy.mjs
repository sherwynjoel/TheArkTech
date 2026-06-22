import ftp from "basic-ftp";

async function deploy() {
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
        
        console.log("Deploying _astro...");
        await client.ensureDir("_astro");
        await client.uploadFromDir("dist/_astro");
        
        await client.cd("/");
        console.log("Deploying portfolio...");
        await client.ensureDir("portfolio");
        await client.uploadFromDir("dist/portfolio");
        
        await client.cd("/");
        console.log("Deploying index.html...");
        await client.uploadFrom("dist/index.html", "index.html");
        
        console.log("Deployment complete.");
    } catch(err) {
        console.log("FTP error:", err);
    }
    client.close();
}
deploy();
