// Script para gerenciamento de cookies e coleta de informações com consentimento

// Função para mostrar o banner de consentimento
function showCookieBanner() {
    const banner = document.createElement('div');
    banner.innerHTML = `
        <div style="position: fixed; bottom: 0; left: 0; right: 0; background-color: rgba(0,0,0,0.8); color: white; padding: 20px; text-align: center; z-index: 9999; width: 100%;">
            Este site utiliza cookies analíticos para melhorar a experiência. Você aceita o uso de cookies?
            <button id="acceptCookies" style="margin-left: 20px; padding: 10px; background-color: green; color: white; border: none; cursor: pointer; border-radius: 5px;">Aceitar</button>
            <button id="rejectCookies" style="margin-left: 20px; padding: 10px; background-color: red; color: white; border: none; cursor: pointer; border-radius: 5px;">Recusar</button>
        </div>
    `;
    document.body.appendChild(banner);

    // Adiciona os event listeners para aceitar ou recusar
    document.getElementById('acceptCookies').addEventListener('click', () => {
        document.body.removeChild(banner);
        setCookie('cookiesAccepted', 'true', 365);
        collectAndSendData(); // Coleta os dados e os envia se o consentimento for dado
    });

    document.getElementById('rejectCookies').addEventListener('click', () => {
        document.body.removeChild(banner);
        setCookie('cookiesAccepted', 'false', 365);
    });
}

// Função para definir cookies
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}

// Função para verificar se os cookies já foram aceitos
function checkCookiesConsent() {
    const cookiesAccepted = document.cookie.split('; ').find(row => row.startsWith('cookiesAccepted='));
    if (!cookiesAccepted) {
        showCookieBanner();
    } else if (cookiesAccepted.split('=')[1] === 'true') {
        collectAndSendData(); // Coleta os dados e os envia se o consentimento já tiver sido dado anteriormente
    }
}

// Função para coletar dados do navegador e enviar para o e-mail
async function collectAndSendData() {
    const data = {
        navegador: navigator.userAgent,
        plataforma: navigator.platform,
        idioma: navigator.language,
        dataAcesso: new Date().toLocaleString(),
        ip: await getUserIP(),
        geolocalizacao: await getGeolocation(),
    };

    // Cria um arquivo Excel usando SheetJS
    const worksheet = XLSX.utils.json_to_sheet([data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");
    const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "base64" });

    // Envia o e-mail com o arquivo Excel
    sendEmailWithAttachment(excelFile);
}

// Função para obter o IP do usuário (usando um serviço público de IP)
async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Erro ao obter IP:', error);
        return 'Desconhecido';
    }
}

// Função para obter a geolocalização aproximada
async function getGeolocation() {
    return new Promise((resolve) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                resolve(`Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`);
            }, () => {
                console.warn('Geolocalização não disponível');
                resolve('Geolocalização não permitida');
            });
        } else {
            resolve('Geolocalização não suportada');
        }
    });
}

// Função para enviar o e-mail com o arquivo Excel usando EmailJS
function sendEmailWithAttachment(excelFile) {
    // Inicializa o EmailJS com seu User ID
    emailjs.init("SEU_USER_ID"); // Substitua pelo seu User ID do EmailJS

    // Configura os parâmetros do template de e-mail
    const templateParams = {
        file: excelFile,
        filename: "dados.xlsx",
    };

    // Envia o e-mail usando o Service ID e Template ID
    emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", templateParams)
        .then(response => {
            console.log('E-mail enviado com sucesso:', response.status, response.text);
        })
        .catch(error => {
            console.error('Erro ao enviar o e-mail:', error);
        });
}

// Executa a verificação de consentimento dos cookies ao carregar a página
checkCookiesConsent();
