import { products } from "../data/products.js";

const date_comanda = JSON.parse(localStorage.getItem('date_comanda2')) || [];
let pret_final = 0;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';


// ------------------ CODURI PRODUSE ------------------
let cod_produse = JSON.parse(localStorage.getItem('coduri'));

if (!Array.isArray(cod_produse) || cod_produse.length !== date_comanda.length) {
    cod_produse = [];
    for (let j = 0; j < date_comanda.length; j++) {
        let result = '';
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        cod_produse.push(result);
    }
    localStorage.setItem('coduri', JSON.stringify(cod_produse));
}



// ------------------ FACTURA ------------------
let factura = localStorage.getItem('factura');
if (!factura) {
    factura = 'ATX-';
    const numere = '0123456789';
    for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * numere.length);
        factura += numere[randomIndex];
    }
    localStorage.setItem('factura', factura);
}

// ------------------ DATA ------------------
let data_comenzii = localStorage.getItem('data_comenzii');
if (!data_comenzii) {
    let data_azi = new Date();
    const ziua = data_azi.getDate();
    const luna_index = data_azi.getMonth();
    const anul = data_azi.getFullYear();
    data_comenzii = `${ziua}.${luna_index + 1}.${anul}`;
    localStorage.setItem('data_comenzii', data_comenzii);
}

// ------------------ AWB ------------------
let AWB = localStorage.getItem('AWB');
if (!AWB) {
    AWB = 'ALXR';
    const numere = '0123456789';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * numere.length);
        AWB += numere[randomIndex];
    }
    AWB += ' Cargus';
    localStorage.setItem('AWB', AWB);
}


// ------------------ SALVARE COMANDA ------------------
const taxeSuplimentarePerProdus = JSON.parse(localStorage.getItem('taxeSuplimentarePerProdus_factura')) || {};

// ------------------ SALVARE COMANDA ------------------
let listaComenzi = JSON.parse(localStorage.getItem('lista_comenzi')) || [];
let suma_reducere = parseFloat(localStorage.getItem('suma_reducere_factura')) || 0;
let taxa_de_livrare = parseFloat(localStorage.getItem('taxa_de_livrare')) || 0;

// Inițializăm comandaNoua înainte de a o folosi
let comandaNoua = {
    produse: date_comanda,
    coduriProduse: cod_produse,
    total: 0,
    factura: factura,
    data: data_comenzii,
    AWB: AWB,
    subtotal: 0,
    costul_cosului: 0,
    cuponAplicat: suma_reducere > 0,
    extra_garantie: [],
    mobile_protect: []
};

if (date_comanda.length > 0) {
    date_comanda.forEach((item) => {
        // Căutăm produsul corespunzător în lista de produse
        const matchingProduct = products.find(p => p.id === item.id);

        if (matchingProduct) {
            let totalPrice = parseFloat(matchingProduct.pret) * parseInt(item.cantitate);
            comandaNoua.total += totalPrice;

            // Verificăm dacă există o extragarantie pentru acest produs
            let extra_garantie = taxeSuplimentarePerProdus[`${item.id}_grup2`];
            let mobile_protect = taxeSuplimentarePerProdus[`${item.id}_grup3`];

            if (extra_garantie !== undefined) {
                comandaNoua.extra_garantie.push({
                    productId: item.id,
                    extraGarantie: extra_garantie
                });
            }

            if (mobile_protect !== undefined) {
                comandaNoua.mobile_protect.push({
                    productId: item.id,
                    mobile_protect: mobile_protect
                });
            }


        }

    });

    // Obținem costul cosului
    let costul_cosului = JSON.parse(localStorage.getItem('costul_cosului'));

    // Actualizăm subtotalul și costul cosului în comandaNoua
    comandaNoua.subtotal = costul_cosului;
    comandaNoua.costul_cosului = costul_cosului;
    comandaNoua.subtotal = costul_cosului - suma_reducere - taxa_de_livrare;


    // Salvăm comandaNoua în lista de comenzi
    listaComenzi.push(comandaNoua);
    localStorage.setItem('lista_comenzi', JSON.stringify(listaComenzi));
}

console.log(listaComenzi);

// ------------------ GENERARE HTML PENTRU TOATE COMENZILE ------------------


let toateComenzileHTML = '';

listaComenzi.forEach((comanda) => {
    let produseComandaHTML = ''; // Resetăm produsele pentru fiecare comandă

    comanda.produse.forEach((item, index) => {
        const produs = products.find(p => p.id === item.id);
        const total = parseFloat(produs.pret) * parseInt(item.cantitate);

        produseComandaHTML += `
      
             <div class="center_part2">
                <div style="display: flex; flex: 3;">
                    <img src="${produs.image}" class="imagine_produs">
                    <p class="text_detalii_produs">${produs.name}</p>
                </div>
                <div class="text_detalii_cod_produs">
                    <p>${comanda.coduriProduse[index]}</p>
                </div>
                <div class="text_cantitate_produs">
                    <p>${item.cantitate}</p>
                </div>
                <div>
                    <p class="pret">${total}</p>
                </div>
            </div> 
   
           
        `;

        // Extra garanție
        const garantieCurenta = comanda.extra_garantie.find(g => g.productId === item.id);
        const mobile_protect_curent = comanda.mobile_protect.find(g => g.productId === item.id);

        let ani_de_garantie = 0;

        if (garantieCurenta !== undefined) {
            // Garanții pentru primul grup
            if ([56, 77, 126, 147].includes(garantieCurenta.extraGarantie)) {
                switch (garantieCurenta.extraGarantie) {
                    case 56:
                        ani_de_garantie = 1;
                        break;
                    case 77:
                        ani_de_garantie = 2;
                        break;
                    case 126:
                        ani_de_garantie = 3;
                        break;
                    case 147:
                        ani_de_garantie = 4;
                        break;
                }

                produseComandaHTML += `
                    <div class="afisare_extragarantii">
                        <div class = "extra_garantie">
                             <img src = "imagini_altex/notes-icon-free-vector.jpg " class = "icon_extra_garantie">
                             <p class="pret">Extra garanție timp de ${ani_de_garantie} ani: </p>
                        </div>
                        <p class="pret">${garantieCurenta.extraGarantie * parseInt(item.cantitate)} </p>
                    </div>`;
            }
        }


        if (mobile_protect_curent !== undefined) {
            if ([175, 345].includes(mobile_protect_curent.mobile_protect)) {
                switch (mobile_protect_curent.mobile_protect) {
                    case 175:
                        ani_de_garantie = 1;
                        break;
                    case 345:
                        ani_de_garantie = 2;
                        break;
                }

                produseComandaHTML += `
                         <div class="afisare_extragarantii">
                             <div class = "mobile_protect" >
                                  <img src = "imagini_altex/free-shield-icon-download-in-svg-png-gif-file-formats--protect-verify-defense-safety-business-services-vol-3-pack-icons-4114.webp " class = "icon_extra_garantie" style = "margin-right : 5px;">
                                  <p class="pret">Mobile protect timp de ${ani_de_garantie} ani: </p>
                             </div>
                             <p class="pret">${mobile_protect_curent.mobile_protect * parseInt(item.cantitate)}</p>
                         </div>`;
            }
        }


    });

    // Adăugăm produsele comenzii și detaliile la HTML-ul total
    toateComenzileHTML += `
    <div class="div_center">
        <div class="center_part1">
            <div class="detalii_produs">Produs</div>
            <div class="detalii_cod_produs">Cod produs</div>
            <div class="detalii_cantitate_produs">Cantitate</div>
            <div>Subtotal</div>
        </div>

        <div class="ordonam_comenzile">${produseComandaHTML}</div>

        <div class="center_part3">
            <div class="center_part3_1">
                <p>Subtotal:</p>
                <p class="pret">     
                 ${comanda.costul_cosului} 
                </p>
            </div> 
          <div class="center_part3_2">
            <p>Cost total:</p>
            <p class="pret">
                 ${comanda.cuponAplicat ? '<span style="color: green;  margin-right: 15px;"> (Cupon de reducere aplicat) </span>' : ''} ${comanda.subtotal}                
            </p>
          </div>

        </div>

        <div class="center_part4">
            <p>Nume factura</p>
            <p>Data</p>
            <p>Pretul total</p>
            <p>AWB</p>
        </div>

        <div class="center_part5">
            <p>${comanda.factura}</p>
            <p>${comanda.data}</p>
            <p>${comanda.costul_cosului}</p>
            <p>${comanda.AWB}</p>
        </div>
    </div>
    `;
});


document.querySelector('.div_comenzile').innerHTML = toateComenzileHTML;

lipsa_comenzi();

function lipsa_comenzi() {
    if (listaComenzi.length === 0) {
        let lipsesc_comenzile = ` <div class="lipsa_comenzi">
                            <img src="imagini_altex/no-item-in-the-shopping-cart-click-to-go-shopping-now-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg" class="icon_cos_gol">
                            <p class = "text_lipsa_comenzi">Nu exista comenzi.</p>
                            <p class = "text_lipsa_comenzi">Adauga produsele dorite si fa prima comanda.</p>
                            <a href="Altex_site.html" class = "button_cos_gol">Mergi la pagina principala</a>
                        </div>`;
        document.querySelector('.div_comenzile').innerHTML = lipsesc_comenzile;

    }

}


// Inițializăm cart-ul cu valoarea din localStorage sau un array gol dacă nu există nimic
let cart = [];
try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
} catch (e) {
    console.error("Failed to parse 'cart' from localStorage", e);
    cart = [];
}

// Verificăm dacă cart-ul este gol
if (cart.length === 0) {
    // ------------------ CURĂȚĂM LOCALSTORAGE TEMPORAR ------------------
    localStorage.removeItem('date_comanda2');
    localStorage.removeItem('factura');
    localStorage.removeItem('data_comenzii');
    localStorage.removeItem('AWB');
    localStorage.removeItem('coduri');
    localStorage.removeItem('suma_reducere_factura');
    //localStorage.removeItem('lista_comenzi');
}

// Salvează cart-ul în localStorage (în cazul în care l-ai modificat)
localStorage.setItem('cart', JSON.stringify(cart));

// ------------------ ACUTALIZAM NR DE PRODUSE DIN COS ------------------
let produse_cos = cart.length;

// Actualizăm numărul de produse în coș în DOM
document.querySelector('.nr_de_produse_in_cos').textContent = produse_cos;


let min = 0;
let max = 0;

document.querySelectorAll('.patrate').forEach((patrat) => {
    patrat.addEventListener('click', (event) => {
        let id = event.currentTarget.id;
        console.log("Ai dat click pe:", id);
        switch (id) {
            case "suma_1":
                min = 50;
                max = 100;
                break;
            case "suma_2":
                min = 100;
                max = 200;
                break;
            case "suma_3":
                min = 200;
                max = 500;
                break;
        }
        console.log(min, max);
    });
});