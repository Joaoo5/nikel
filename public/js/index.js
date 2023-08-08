const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged")
const session = localStorage.getItem("session")

//LOGAR NO SISTEMA
    document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checksession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Opps! Verifique o usuário ou a senha.")
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Opps! Verifique o usuário ou a senha.")
            return;
        }

    
        window.location.href = "home.html";
        saveSession(email, checksession);
    } 
})

//CRIAR CONTA

    document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.lenght < 5) {
        alert("Preencha o campo com um email válido.");
        return;
    }

    if(password.lenght < 4) {
        alert("Preencha com uma senha de no mínimo 4 dígitos.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    })

    myModal.hide();

    alert("Conta criada com sucesso!");
});

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session)
        logged=session;
    }

    if(logged){
        saveSession(logged, session)
        window.location.href = "home.html"
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data))
}

function saveAccount(data, saveSession) {
    if(saveSession) {
        localStorage.getItem("session", data)

    }
    sessionStorage.setItem("logged", data)
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}
