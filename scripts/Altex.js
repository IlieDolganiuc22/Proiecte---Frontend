import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";


localStorage.removeItem('min_max');
const favorite = JSON.parse(localStorage.getItem('favorite2'));
document.querySelector('.nr_de_produse_favorite').innerHTML = favorite.length;
const salvate = JSON.parse(localStorage.getItem('salvate'));
document.querySelector('.nr_de_produse_salvate').innerHTML = salvate.length;

let brand2;
let min = 0;
let max = 0;
let rating = 0;
let retea = '';

document.querySelector('.nr_produse').innerHTML = `( ${products.length} )`;

încarcare_produse();
accesare_produs();

function încarcare_produse() {
    let productsHTML = '';
    products.forEach(product => {
        productsHTML += `
            <div class="structura_produs">
                <img class="imagini_telefoane" src="${product.image}">
                <p class="info_tel">${product.name}</p>
                <p style="margin-left: 21px; margin-top: 10px ; margin-bottom : 0px ">In stoc</p>
                <div class="ordonare_rating">
                     <div class="strucura_stele">${product.rating.stars}</div>
                    <div style = " margin-left : 5px; ">(${product.rating.count})</div>
                </div>
                <p class="info_pret_producator">${product.pret_producator}</p>
                <p class="pret">${product.pret}</p>
                <button class="button_add js-add-to-cart" data-product-id="${product.id}">Adauga in cos</button>
            </div>`;
    });
    document.querySelector('.afisare_prod').innerHTML = productsHTML;
    adauga_in_cos();
}

updateCartQuantity();

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    localStorage.setItem('cartQuantity', cartQuantity);

}

function adauga_in_cos() {
    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        const newButton = button.cloneNode(true);
        button.replaceWith(newButton);
    });

    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            addToCart(productId);
            updateCartQuantity();
            showToast("Cos actualizat cu succes!", "imagini_altex/ok_icon_preview.png");

        });
    });
}

// Cautare text
document.querySelector('.search').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let produs_cautat = event.target.value.trim();
        if (!produs_cautat) {
            încarcare_produse();
            return;
        }

        let rezultateHTML = '';
        products.forEach((item) => {
            if (item.name.toLowerCase().includes(produs_cautat.toLowerCase())) {
                rezultateHTML += `
                   <div class="structura_produs">
                <img class="imagini_telefoane" src="${item.image}">
                <p class="info_tel">${item.name}</p>
                <p style="margin-left: 21px; margin-top: 10px ; margin-bottom : 0px ">In stoc</p>
                <div class="ordonare_rating">
                     <div class="strucura_stele">${item.rating.stars}</div>
                    <div style = " margin-left : 5px; ">(${item.rating.count})</div>
                </div>
                <p class="info_pret_producator">${item.pret_producator}</p>
                <p class="pret">${item.pret}</p>
                <button class="button_add js-add-to-cart" data-product-id="${item.id}">Adauga in cos</button>
            </div>`;
            }
        });

        if (rezultateHTML === '') {
            rezultateHTML = `<div class = "produs_inexistent">
                                 <img class="logo_produs_inexistent" src="imagini_altex/11329060.png">
                                <p class="text_produs_negasit">Ne pare rau , acest produs nu a fost gasit. Verifica daca ai scris corect sau incearca sa cauti folosind alt termen.</p>
                             </div>`;
        }
        document.querySelector('.afisare_prod').innerHTML = rezultateHTML;
        adauga_in_cos();
    }
});

// Filtrare după preț manual
document.querySelector('.placeholder2').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        filtrareProduse();
    }
});

// Filtrare după brand din input
document.querySelector('.placeholder3').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        brand2 = event.target.value.trim();
        filtrareProduse();
    }
});

// Filtrare după brand (selectie vizuala)
document.querySelectorAll('.box').forEach((patrat) => {
    patrat.addEventListener('click', (event) => {

        brand2 = event.currentTarget.id;
        const dejaActiv = event.currentTarget.classList.contains('activ');

        document.querySelectorAll('.box').forEach((img) => {
            img.classList.remove('activ');
            img.src = "imagini_altex/white-medium-square-emoji-clipart-lg.png";
        });

        if (dejaActiv) {
            brand2 = '';
        } else {
            event.currentTarget.classList.add('activ');
            event.currentTarget.src = "imagini_altex/bifați-simbolul-în-marcajul-de-selectare-pătrat-verde-pictograma-vectorială-casetei-bifă-dreapta-sau-ok-cu-casetă-162836711.webp";

        }

        filtrareProduse();
    });
});

// Filtrare după interval de preț (butoane)
document.querySelectorAll('.patrate').forEach((patrat) => {
    patrat.addEventListener('click', (event) => {
        const esteActiv = event.currentTarget.classList.contains('activ');

        document.querySelectorAll('.patrate').forEach((img) => {
            img.classList.remove('activ');
            img.src = "imagini_altex/white-medium-square-emoji-clipart-lg.png";
        });

        if (esteActiv) {
            min = 0;
            max = 0;
            localStorage.removeItem('min_max');
        } else {
            const id = event.target.id;
            switch (id) {
                case "suma_1":
                    min = 500;
                    max = 1000;
                    break;
                case "suma_2":
                    min = 1000;
                    max = 1500;
                    break;
                case "suma_3":
                    min = 1500;
                    max = 2000;
                    break;
                case "suma_4":
                    min = 2000;
                    max = 5000;
                    break;
                case "suma_5":
                    min = 5000;
                    max = 10000;
                    break;
            }
            event.currentTarget.classList.add('activ');
            event.currentTarget.src = "imagini_altex/bifați-simbolul-în-marcajul-de-selectare-pătrat-verde-pictograma-vectorială-casetei-bifă-dreapta-sau-ok-cu-casetă-162836711.webp";

        }

        localStorage.setItem('min_max', JSON.stringify({ min, max }));


        filtrareProduse();
    });
});


let produse_dupa_filtrare = [];
// FUNCTIA CENTRALIZATA DE FILTRARE
function filtrareProduse() {

    rating = parseInt(localStorage.getItem('rating')) || 0;
    //se stocheaza valoarea din input
    const inputPret = document.getElementById('js_pret_dorit');
    //se verifica daca exista variabila si se elimina spatiile daca nu afiseaza un string gol
    const valoareInput = inputPret ? inputPret.value.trim() : "";
    //transformă valoarea în număr cu virgulă (dacă e valid).
    const pretInput = parseFloat(valoareInput);
    //daca nr e valid , verificam sa nu fie introduse simboluri
    const pretValid = !isNaN(pretInput) && /^\d+(\.\d+)?$/.test(valoareInput);
    let rezultateHTML = '';

    products.forEach(item => {
        //stocam pe rand pretul produsului din baza de date 
        const pretProdus = parseFloat(item.pret);
        //verificam daca pretul corespunde cu cerintele noastre , daca sa declarat un interval comparam daca nu acceptam orice produs
        const inInterval = (min === 0 && max === 0) || (pretProdus >= min && pretProdus <= max);
        //verificam daca pretul cerut este valid si daca da , se verifica daca pretul produsului satisface dorinta si devine true
        //daca nu se accepta orice produs 
        const subPretManual = pretValid ? pretProdus <= pretInput : true;
        //daca sa introdus in input un text pentru brand sau a fost selectat cu butoane atunci conditia devine true
        //daca nu filtrul nu se aplica . (?) --> e un fel de if/else
        const esteBrand = brand2 ? item.name.toLowerCase().includes(brand2.toLowerCase()) : true;
        //daca reting este definit , selectam TRUE si verificam daca ce produse satisfac cerinta 
        const rating_dorit = rating ? item.rating.nr_stars >= rating : true;
        //daca retea este definit , selectam TRUE si verificam daca ce produse satisfac cerinta 
        const reteaua_dorita = retea ? item.retea.toLowerCase().includes(retea.toLowerCase()) : true;


        if (inInterval && subPretManual && esteBrand && rating_dorit && reteaua_dorita) {
            rezultateHTML += `
                <div class="structura_produs">
                <img class="imagini_telefoane" src="${item.image}">
                <p class="info_tel">${item.name}</p>
                <p style="margin-left: 21px; margin-top: 10px ; margin-bottom : 0px ">In stoc</p>
                <div class="ordonare_rating">
                     <div class="strucura_stele">${item.rating.stars}</div>
                    <div style = " margin-left : 5px; ">(${item.rating.count})</div>
                </div>
                <p class="info_pret_producator">${item.pret_producator}</p>
                <p class="pret">${item.pret}</p>
                <button class="button_add js-add-to-cart" data-product-id="${item.id}">Adauga in cos</button>
            </div>`;
        }

    });

    if (rezultateHTML === '') {
        rezultateHTML = `<div class = "produs_inexistent">
                             <img class="logo_produs_inexistent" src="imagini_altex/11329060.png">
                            <p class="text_produs_negasit">Ne pare rau , acest produs nu a fost gasit. Verifica daca ai scris corect sau incearca sa cauti folosind alt termen.</p>
                         </div>`;
    }
    document.querySelector('.afisare_prod').innerHTML = rezultateHTML;
    produse_dupa_filtrare = [];
    //Caută toate elementele din pagina HTML care sunt în interiorul unui element cu clasa .afisare_prod si au atributul data_product_id
    const elementeProduse = document.querySelectorAll('.afisare_prod [data-product-id]');
    //le pune intrun array si extrage id din fiecare 
    produse_dupa_filtrare = Array.from(elementeProduse).map(el => el.getAttribute('data-product-id'));

    adauga_in_cos();
    accesare_produs();

}

document.querySelectorAll('.select_rating').forEach((button) => {
    button.addEventListener('click', (event) => {
        const butonActiv = event.currentTarget.classList.contains('activ');

        document.querySelectorAll('.select_rating').forEach((img) => {
            img.classList.remove('activ');
            img.src = "imagini_altex/white-medium-square-emoji-clipart-lg.png";
        });

        if (butonActiv) {
            rating = 0;
            localStorage.removeItem('rating');
        } else {
            const id = event.currentTarget.id;
            switch (id) {
                case "5_stele":
                    rating = 5;
                    break;
                case "4_stele":
                    rating = 4;
                    break;
                case "3_stele":
                    rating = 3;
                    break;
                case "2_stele":
                    rating = 2;
                    break;
                case "1_stele":
                    rating = 1;
                    break;

            }

            event.currentTarget.classList.add('activ');
            event.currentTarget.src = "imagini_altex/bifați-simbolul-în-marcajul-de-selectare-pătrat-verde-pictograma-vectorială-casetei-bifă-dreapta-sau-ok-cu-casetă-162836711.webp";
        }
        localStorage.setItem('rating', rating);
        filtrareProduse();
    });
});

document.querySelectorAll('.retea').forEach((button) => {
    button.addEventListener('click', (event) => {
        const butonActiv = event.currentTarget.classList.contains('activ');

        document.querySelectorAll('.retea').forEach((img) => {
            img.classList.remove('activ');
            img.src = "imagini_altex/white-medium-square-emoji-clipart-lg.png";
        });

        if (butonActiv) {
            retea = '';
        } else {
            const id = event.currentTarget.id;
            switch (id) {
                case "5G":
                    retea = '5G';
                    break;
                case "4G":
                    retea = '4G';
                    break;
                case "3G":
                    retea = '3G';
                    break;
            }
            event.currentTarget.classList.add('activ');
            event.currentTarget.src = "imagini_altex/bifați-simbolul-în-marcajul-de-selectare-pătrat-verde-pictograma-vectorială-casetei-bifă-dreapta-sau-ok-cu-casetă-162836711.webp";

        }
        filtrareProduse();
    });
});


document.getElementById("sortare").addEventListener("change", function() {
    const valoare = this.value;

    //Verifici dacă există produse filtrate deja (produse_dupa_filtrare nu e gol):
    //✅ Dacă da, iei din products DOAR produsele ale căror ID-uri sunt în produse_dupa_filtrare.
    //❌ Dacă nu, folosești TOATE produsele ([...products] face o copie, ca să nu modifici lista originală).
    let produseDeSortat = produse_dupa_filtrare.length !== 0 ?
        products.filter(prod => produse_dupa_filtrare.includes(prod.id)) : [...products];

    switch (valoare) {
        case "sortare_nume":
            produseDeSortat.sort((a, b) => a.name.localeCompare(b.name));
            break;

        case "sortare_crescator":
            produseDeSortat.sort((a, b) => parseFloat(a.pret) - parseFloat(b.pret));
            break;

        case "sortare_descrescator":
            produseDeSortat.sort((a, b) => parseFloat(b.pret) - parseFloat(a.pret));
            break;

        case "sortare_recenzii":
            produseDeSortat.sort((a, b) => b.rating.count - a.rating.count);
            break;
    }

    // Afișăm produsele sortate
    let produseHTML = '';
    produseDeSortat.forEach((produs) => {
        produseHTML += `
            <div class="structura_produs">
                <img class="imagini_telefoane" src="${produs.image}">
                <p class="info_tel">${produs.name}</p>
                <p style="margin-left: 21px; margin-top: 10px ; margin-bottom : 0px ">In stoc</p>
                <div class="ordonare_rating">
                     <div class="strucura_stele">${produs.rating.stars}</div>
                    <div style = " margin-left : 5px; ">(${produs.rating.count})</div>
                </div>
                <p class="info_pret_producator">${produs.pret_producator}</p>
                <p class="pret">${produs.pret}</p>
                <button class="button_add js-add-to-cart" data-product-id="${produs.id}">Adauga in cos</button>
            </div>`;
    });

    document.querySelector('.afisare_prod').innerHTML = produseHTML;
    adauga_in_cos();
    accesare_produs();
});

export function accesare_produs() {
    document.querySelectorAll('.structura_produs').forEach((produs) => {
        produs.addEventListener('click', (event) => {
            // Dacă s-a dat click pe butonul „Adaugă în coș”, nu face nimic
            if (event.target.classList.contains('js-add-to-cart')) return;

            // Găsim butonul din interiorul produsului curent
            const buton = produs.querySelector('.js-add-to-cart');
            if (buton) {
                //extragem id produsului din acel buton
                const id = buton.getAttribute('data-product-id');
                localStorage.setItem('id_produs_accesat', id);

                // Redirecționează către pagina Produs.html
                window.location.href = 'Produs.html';
            }
        });
    });
};

function showToast(message, imageUrl) {
    const toast = document.getElementById("toast");
    // Dacă ai primit o imagine, inserează și imaginea, altfel doar textul
    if (imageUrl) {
        toast.innerHTML = `<img src="${imageUrl}" alt="" style="width:24px; height:24px; vertical-align:middle; margin-right:8px;">${message}`;
    } else {
        toast.textContent = message;
    }
    toast.style.visibility = "visible";
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.visibility = "hidden";
    }, 1500);
}
window.showToast = showToast;