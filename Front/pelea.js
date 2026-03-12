let jugadores = [
    { nombre:'', img:'', hp:100, turnos:0, defendiendo:false, defEspecial:false },
    { nombre:'', img:'', hp:100, turnos:0, defendiendo:false, defEspecial:false }
];

let turno = 0;
let movimientos = 0;
const MAX_MOVIMIENTOS = 15;

window.onload = async () => {
    try {
        const r = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await r.json();
        const list = document.getElementById('pokemon-list');

        data.results.forEach(p => {
            const option = document.createElement('option');
            option.value = p.name;
            list.appendChild(option);
        });

    } catch {
        console.log("Error en autocompletado");
    }
};

async function iniciarBatalla(){

    const p1 = document.getElementById("poke1-input").value;
    const p2 = document.getElementById("poke2-input").value;

    if(!p1 || !p2){
        alert("Selecciona dos Pokemon");
        return;
    }

    try{

        const data1 = await obtenerPokemon(p1);
        const data2 = await obtenerPokemon(p2);

        Pokemon(jugadores[0],data1,'p1');
        Pokemon(jugadores[1],data2,'p2');

        document.getElementById('selection-screen').classList.remove('active');
        document.getElementById('battle-screen').classList.add('active');

        setTimeout(simularTurno,1500);

    }catch{
        alert("Pokemon no encontrado");
    }
}

function Pokemon(obj,data,prefix){

    obj.nombre = data.name.toUpperCase();
    obj.img = data.sprites.other['official-artwork'].front_default;
    obj.hp = 100;
    obj.turnos = 0;

    document.getElementById(`${prefix}-name`).innerText = obj.nombre;
    document.getElementById(`${prefix}-img`).src = obj.img;
}

async function obtenerPokemon(nombre){
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
    return r.json();
}

function simularTurno(){

    movimientos++;

    if(movimientos > MAX_MOVIMIENTOS){
        finalizarPorLimite();
        return;
    }

    const atacante = jugadores[turno];
    const defensor = jugadores[1-turno];

    let opciones = ['ataque','defensa'];

    if(atacante.turnos >= 3) opciones.push('especial');
    if(atacante.turnos >= 2) opciones.push('def-especial');

    const accion = opciones[Math.floor(Math.random()*opciones.length)];
    const falla = Math.random() < 0.2;

    if(falla){
        actualizarNarrador(`[Mov ${movimientos}] ${atacante.nombre} intentó ${accion} pero falló`);
    }else{
        procesarAccion(atacante,defensor,accion);
    }

    atacante.turnos++;

    if(defensor.hp <= 0){
        setTimeout(()=>mostrarGanador(atacante),1000);
    }else{
        turno = 1 - turno;
        setTimeout(simularTurno,2000);
    }
}

function procesarAccion(a,d,tipo){

    let danio = 0;
    a.defendiendo = false;
    a.defEspecial = false;

    let msg = `[Mov ${movimientos}] ${a.nombre}: `;

    if(tipo==="ataque"){
        danio = Math.floor(Math.random()*15)+10;
        msg += "Ataque normal";
    }

    if(tipo==="especial"){
        danio = Math.floor(Math.random()*25)+20;
        msg += "ATAQUE ESPECIAL";
        a.turnos = -1;
    }

    if(tipo==="defensa"){
        a.defendiendo = true;
        msg += "Se defiende";
    }

    if(tipo==="def-especial"){
        a.defEspecial = true;
        msg += "Defensa especial";
        a.turnos = -1;
    }

    if(danio>0){

        if(d.defEspecial){
            danio = 0;
            msg += " bloqueado";
        }
        else if(d.defendiendo){
            danio = Math.floor(danio/2);
        }

        d.hp -= danio;
        if(d.hp < 0) d.hp = 0;

        const img = document.getElementById(turno===0 ? "p2-img" : "p1-img");
        img.classList.add("shake");
        setTimeout(()=>img.classList.remove("shake"),500);
    }

    actualizarNarrador(`${msg}. Daño ${danio}. ${d.nombre} tiene ${d.hp}%`);
    actualizarBarrasHP();
}

function finalizarPorLimite(){

    actualizarNarrador("Limite de movimientos alcanzado");

    if(jugadores[0].hp === jugadores[1].hp){
        alert("Empate técnico");
        location.reload();
    }else{
        const ganador = jugadores[0].hp > jugadores[1].hp ? jugadores[0] : jugadores[1];
        setTimeout(()=>mostrarGanador(ganador),1500);
    }
}

function actualizarNarrador(m){

    document.getElementById("narrator-text").innerText = m;

    const li = document.createElement("li");
    li.innerText = m;

    document.getElementById("log-list").prepend(li);
}

function actualizarBarrasHP(){

    document.getElementById("p1-hp-bar").style.width = jugadores[0].hp + "%";
    document.getElementById("p1-hp-text").innerText = jugadores[0].hp;

    document.getElementById("p2-hp-bar").style.width = jugadores[1].hp + "%";
    document.getElementById("p2-hp-text").innerText = jugadores[1].hp;
}

function mostrarGanador(g){

    document.getElementById("battle-screen").classList.remove("active");
    document.getElementById("winner-screen").classList.add("active");

    document.getElementById("winner-name").innerText = g.nombre;
    document.getElementById("winner-img").src = g.img;
}