// front-end/postbuild.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distSource = path.resolve(__dirname, "dist");
const distDestination = path.resolve(__dirname, "../public/dist");
const viteBladePath = path.resolve(
    __dirname,
    "../resources/views/partials/vite.blade.php"
);

function removeFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true });
        console.log(`🧹 Pasta antiga removida: ${folderPath}`);
    }
}

function copyDist() {
    fs.cpSync(distSource, distDestination, { recursive: true });
    console.log(`📂 Nova pasta copiada para: ${distDestination}`);
}

function updateViteBlade() {
    const assetsPath = path.join(distDestination, "assets");
    const files = fs.readdirSync(assetsPath);

    const cssFile = files.find((f) => f.endsWith(".css"));
    const jsFile = files.find((f) => f.endsWith(".js"));

    if (!cssFile || !jsFile) {
        console.error(
            "❌ Erro: não foi possível encontrar arquivos .css e .js no build do Vite."
        );
        process.exit(1);
    }

    const bladeContent = `
{{-- ⚙️ Gerado automaticamente por postbuild.js — NÃO EDITAR MANUALMENTE --}}
<link rel="stylesheet" href="{{ main_root() . 'dist/assets/${cssFile}' }}?v={{ time() }}">
<script type="module" src="{{ main_root() . 'dist/assets/${jsFile}' }}?v={{ time() }}"></script>
`;

    fs.writeFileSync(viteBladePath, bladeContent.trim(), "utf8");
    console.log(`✅ Arquivo vite.blade.php atualizado com sucesso!`);
    console.log(`🎨 CSS: ${cssFile}`);
    console.log(`⚡ JS: ${jsFile}`);
}

// 🚀 Execução principal
try {
    console.log("🔧 Iniciando sincronização pós-build...");
    removeFolderRecursive(distDestination);
    copyDist();
    updateViteBlade();
    console.log("🎉 Sincronização concluída com sucesso!");
} catch (err) {
    console.error("❌ Erro durante a sincronização:", err);
    process.exit(1);
}
