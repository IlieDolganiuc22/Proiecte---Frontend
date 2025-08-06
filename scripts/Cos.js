import { cart, removeFromCart, saveToStorage } from '../data/cart.js';
import { products } from '../data/products.js';

let produse_individuale = JSON.parse(localStorage.getItem("produse_individuale")) || [];

afisare_produse_cos();

function afisare_produse_cos() {
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        // Găsește produsul din lista products
        let matchingProduct = products.find(product => product.id === productId);

        let extra_garantie = '';
        let mobil_protect = '';

        // Găsește produsul individual din lista produse_individuale (dacă există)
        let produsIndividual = produse_individuale.find(p => p.id === productId);
        if (produsIndividual) {
            if (produsIndividual.extra_garantie !== "") {
                switch (produsIndividual.extra_garantie) {
                    case "1 an":
                        extra_garantie = "1 an";
                        break;
                    case "2 ani":
                        extra_garantie = "2 ani";
                        break;
                    case "3 ani":
                        extra_garantie = "3 ani";
                        break;
                    case "4 ani":
                        extra_garantie = "4 ani";
                        break;
                }
            }
            if (produsIndividual.mobil_protect !== "") {
                switch (produsIndividual.mobil_protect) {
                    case "1 an":
                        mobil_protect = "1 an";
                        break;
                    case "2 ani":
                        mobil_protect = "2 ani";
                        break;

                }
            }
        };

        cartSummaryHTML += ` 
         <div class="div_center1 js-cart-item-container-${matchingProduct.id}">
            <div>
                <div>
                    <p class="text1">Produse vandute de Altex</p>
                </div>

                <div class="div_center_par1">
                    <img class="image_delivery" src="imagini_altex/pngtree-fast-delivery-icon-delivery-icon-png-image_2047531.jpg">
                    <p class="data_livrarii"> Livrare estimata in BUCURESTI SECTOR 1, prin Cargus, din Bucuresti: ${matchingProduct.data_livrare}</p>
                </div>
            </div>

            <div class="div_center_par2">
                <div class="produs_cumparat">
                    <img src="${matchingProduct.image}" class="imagine_produs js-imagine-produs">
                    <p class="detalii_produs">${matchingProduct.name}</p>
                    <div class="cantitate1">
                        <p>Cantitate</p>
                        <div class="cantitate2">
                            <p style="padding-left: 10px;">${cartItem.quantity}</p>
                            <p class="button_minus js-scade-produs" data-product-id="${matchingProduct.id}">_</p>
                            <p class="button_plus js-adauga-produs" data-product-id="${matchingProduct.id}">+</p>
                            <p class="pret_produs js-modifica-pret" data-product-id="${matchingProduct.id}">
                            ${parseFloat(matchingProduct.pret) * cartItem.quantity}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="garantie">
                    <div class="par1_garantie">
                        <div class="asezare_utilitati">
                            <p class="salveaza"> <img src="imagini_altex/png-clipart-graphy-clock-clock-icon-angle-number-thumbnail.png" class="icons_utilitare"> Salveaza</p>
                        </div>
                        <div class="asezare_utilitati">
                            <p style="width: 200px;" class="favorite"> <img src="imagini_altex/images (4).png" class="icons_utilitare"> Muta la favorite</p>
                        </div>
                        <div class="asezare_utilitati">
                            <p class="sterge_produs js-delete-produs" data-product-id="${matchingProduct.id}" style="padding-top: -20px;">
                                <img src="imagini_altex/delete-icon-isolated-on-black-delete-symbol-suitable-for-graphic-design-and-websites-on-a-white-background-free-vector.jpg" style="width: 30px; margin-bottom: -8px;">
                                Sterge
                            </p>
                        </div>
                    </div>

                    <div class="par2_garantie">
                        <div class="pozitionare_garantii">
                            <img src="imagini_altex/notes-icon-free-vector.jpg" class="icons_utilitare2">
                            <p> Extra garantie</p>
                        </div>

                        <div class="pozitionare_garantii" data_varianta="1">
                            <img src="${
                                produsIndividual && produsIndividual.extra_garantie === '1 an'
                                ? 'imagini_altex/ok_icon_preview.png'
                                : 'imagini_altex/shape-circle-512.webp'
                            }" class="icons_utilitare2" data-taxa-suplimentara="56">
                            <p>Garantie extinsa - 1 Ani - 56 lei</p>
                        </div>

                        <div class="pozitionare_garantii" data_varianta="2">
                            <img src="${
                                produsIndividual && produsIndividual.extra_garantie === '2 ani'
                                ? 'imagini_altex/ok_icon_preview.png'
                                : 'imagini_altex/shape-circle-512.webp'
                            }" class="icons_utilitare2" data-taxa-suplimentara="77">
                            <p>Garantie extinsa - 2 Ani - 77 lei</p>
                        </div>

                        <div class="pozitionare_garantii" data_varianta="3">
                            <img src="${
                                produsIndividual && produsIndividual.extra_garantie === '3 ani'
                                ? 'imagini_altex/ok_icon_preview.png'
                                : 'imagini_altex/shape-circle-512.webp'
                            }" class="icons_utilitare2" data-taxa-suplimentara="126">
                            <p>Garantie extinsa - 3 Ani - 126 lei</p>
                        </div>

                        <div class="pozitionare_garantii" data_varianta="4">
                            <img src="${
                                produsIndividual && produsIndividual.extra_garantie === '4 ani'
                                ? 'imagini_altex/ok_icon_preview.png'
                                : 'imagini_altex/shape-circle-512.webp'
                            }" class="icons_utilitare2" data-taxa-suplimentara="147">
                            <p>Garantie extinsa - 4 Ani - 147 lei</p>
                        </div>
                    </div>

                    <div class="par3_garantie">
                        <div class="pozitionare_garantii">
                            <img src="imagini_altex/free-shield-icon-download-in-svg-png-gif-file-formats--protect-verify-defense-safety-business-services-vol-3-pack-icons-4114.webp" class="icons_utilitare2">
                            <p> Mobile protect</p>
                        </div>

                        <div class="pozitionare_garantii" data_varianta="1">
                            <img src="${
                                produsIndividual && produsIndividual.mobil_protect === '1 an'
                                ? 'imagini_altex/ok_icon_preview.png'
                                : 'imagini_altex/shape-circle-512.webp'
                            }" class="icons_utilitare2" data-taxa-suplimentara="175">
                            <p>Garantie extinsa - 1 Ani - 175 lei</p>
                        </div>

                        <div class="pozitionare_garantii" data_varianta="2">
                            <img src="${
                                produsIndividual && produsIndividual.mobil_protect === '2 ani'
                                ? 'imagini_altex/ok_icon_preview.png'
                                : 'imagini_altex/shape-circle-512.webp'
                            }" class="icons_utilitare2" data-taxa-suplimentara="345">
                            <p>Garantie extinsa - 2 Ani - 345 lei</p>
                        </div>
                    </div>
                </div>
            </div>
         </div>
        `;
    });

    document.querySelector('#produse_din_cos').innerHTML = cartSummaryHTML;

}


afisare_cos_gol();

function afisare_cos_gol() {
    if (cart.length === 0) {
        let cos_gol = ` <div class="cosul_gol">
                            <img src="imagini_altex/no-item-in-the-shopping-cart-click-to-go-shopping-now-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg" class="icon_cos_gol">
                            <p class = "text_cos_gol">Nu exista produse in cosul de cumparaturi.</p>
                            <p class = "text_cos_gol">Adauga produsele dorite si revino.</p>
                            <a href="Altex_site.html" class = "button_cos_gol">Mergi la pagina principala</a>
                        </div>`;
        document.querySelector('#produse_din_cos').innerHTML = cos_gol;

    }

}


//functia care sterge produsele
document.querySelectorAll('.js-delete-produs')
    .forEach((link) => {
        link.addEventListener('click', () => {
            //cand apasam pe stergere , sterge elementul si din cart si din pagina
            const productId = link.dataset.productId;
            removeFromCart(productId);
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            let produsIndividual = produse_individuale.filter(p => p.id !== productId);
            localStorage.setItem("produse_individuale", JSON.stringify(produsIndividual));
            if (cart.length === 0) {
                localStorage.removeItem('suma_reducere');
                afisare_cos_gol();

            }
            cost_cos();

            showToast("Produsul a fost sters cu succes!", "imagini_altex/ok_icon_preview.png");
        });
    });

document.querySelectorAll('.js-adauga-produs').forEach((link) => {
    link.addEventListener('click', () => {
        // Obține ID-ul produsului asociat butonului
        const productId = link.dataset.productId;

        // Găsește produsul corespunzător în cart
        const cartItem = cart.find((item) => item.productId === productId);

        // Verifică dacă produsul există și crește cantitatea
        if (cartItem) {
            cartItem.quantity += 1;

            // Găsim produsul corespondent ca să luăm prețul per bucată
            const matchingProduct = products.find(product => product.id === productId);

            if (matchingProduct) {
                const totalPrice = parseFloat(matchingProduct.pret) * cartItem.quantity;

                // Actualizează prețul în UI (dacă vrei)
                const priceElement = document.querySelector(`.js-cart-item-container-${productId} .js-modifica-pret`);
                priceElement.textContent = totalPrice;
            }

            // Actualizează cantitatea în UI
            const quantityElement = document.querySelector(`.js-cart-item-container-${productId} .cantitate2 p:first-child`);
            quantityElement.textContent = cartItem.quantity;

            cost_cos();
            // Salvează modificările în storage (dacă este necesar)
            saveToStorage(cart);
        } else {
            console.error(`Produsul cu ID-ul ${productId} nu a fost găsit în coș.`);
        }
    });
});

document.querySelectorAll('.js-scade-produs').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const cartItem = cart.find((item) => item.productId === productId);

        if (cartItem && cartItem.quantity > 1) {
            cartItem.quantity -= 1;

            // Găsim produsul corespondent ca să luăm prețul per bucată
            const matchingProduct = products.find(product => product.id === productId);

            if (matchingProduct) {
                const totalPrice = parseFloat(matchingProduct.pret) * cartItem.quantity;


                // Actualizează prețul în UI (dacă vrei)
                const priceElement = document.querySelector(`.js-cart-item-container-${productId} .js-modifica-pret`);
                priceElement.textContent = totalPrice;
            }

            // Actualizează cantitatea în UI
            const quantityElement = document.querySelector(`.js-cart-item-container-${productId} .cantitate2 p:first-child`);
            quantityElement.textContent = cartItem.quantity;

            cost_cos();

            saveToStorage(cart);
        }
    });
});

let nr_cupoane = parseFloat(localStorage.getItem('nr_cupoane')) || 0;
let suma_reducere = parseFloat(localStorage.getItem('suma_reducere')) || 0; // Citim reducerea din localStorage sau setăm 0 dacă nu există
let taxeSuplimentarePerProdus = JSON.parse(localStorage.getItem('taxeSuplimentarePerProdus')) || {};

let pret_final = 0;

cost_cos();

function cost_cos() {

    let cost_total_pentru_cos = 0;

    if (cart.length === 0) {
        suma_reducere = 0;
        localStorage.setItem('suma_reducere', suma_reducere);

        nr_cupoane = 0;
        localStorage.setItem('nr_cupoane', nr_cupoane);
        document.querySelector('.js-nr-cupoane').innerHTML = `(${nr_cupoane})`;

        localStorage.removeItem('cupoane_expirate2');
        taxeSuplimentarePerProdus = {};
        localStorage.removeItem('taxeSuplimentarePerProdus');

        // Afișează UI-ul gol, dar nu rescrie costul_cosului în localStorage
        document.querySelector('.pret_total_pt_toate_produsele').innerHTML = '0 lei';
        document.querySelector('.taxa_de_livrare').innerHTML = 'Gratis';
        document.querySelector('.pret_total_pt_toate_produsele2').innerHTML = '0 lei';
        return;
    }

    cart.forEach((cartItem) => {
        const product = products.find(p => p.id === cartItem.productId);
        if (product) {
            cost_total_pentru_cos += parseFloat(product.pret) * cartItem.quantity;
        }
    });

    let taxa_livrare = 20;
    let totalTaxeSuplimentare = 0;

    if (cost_total_pentru_cos > 100 || cost_total_pentru_cos === 0) {
        taxa_livrare = 0;
        document.querySelector('.taxa_de_livrare').innerHTML = 'Gratis';
    } else {
        document.querySelector('.taxa_de_livrare').innerHTML = taxa_livrare;
    }

    cart.forEach(cartItem => {
        const productId = cartItem.productId;
        const quantity = cartItem.quantity;

        // Parcurgem toate cheile și căutăm cele care conțin acest productId
        for (const key in taxeSuplimentarePerProdus) {
            if (key.startsWith(productId + '_')) {
                const taxaValoare = parseFloat(taxeSuplimentarePerProdus[key]) || 0;
                totalTaxeSuplimentare += taxaValoare * quantity;
            }
        }
    });


    let costul_cosului = cost_total_pentru_cos - suma_reducere + totalTaxeSuplimentare + taxa_livrare;

    document.querySelector('.pret_total_pt_toate_produsele').innerHTML = costul_cosului + ' lei';

    pret_final = cost_total_pentru_cos + taxa_livrare - suma_reducere + totalTaxeSuplimentare;
    document.querySelector('.pret_total_pt_toate_produsele2').innerHTML = pret_final + ' lei';

    localStorage.setItem('suma_reducere', suma_reducere);
    localStorage.setItem('costul_cosului', costul_cosului);
    localStorage.setItem('taxa_de_livrare', taxa_livrare);


}



let cupoane_utilizate = [];
try {
    const raw = localStorage.getItem('cupoane_utilizate');
    cupoane_utilizate = raw ? JSON.parse(raw) : [];
} catch (e) {
    console.error("Eroare la parsarea cupoane_utilizate:", e);
    cupoane_utilizate = [];
}

//localStorage.removeItem('cupoane_utilizate');
let cupoane = ['altex40', 'weekend', 'paste25'];
document.querySelector('.js-nr-cupoane').innerHTML = `(${nr_cupoane})`;
let cupoane_expirate2 = JSON.parse(localStorage.getItem('cupoane_expirate2')) || [];
let reducere;

document.querySelector('.icon_add_cupon').addEventListener('click', () => {
    if (cupoane_utilizate.length === cupoane.length) {
        showToast2("Nu mai aveti cupoane valide!", "imagini_altex/stop-sign-icon-in-flat-style-danger-symbol-vector-20857678-removebg-preview.png");
        document.querySelector('.input_cupon').value = '';
    } else {
        reducere = document.querySelector('.input_cupon').value;

        if (cupoane_utilizate.includes(reducere)) {
            showToast2("Cuponul a fost folosit deja!", "imagini_altex/stop-sign-icon-in-flat-style-danger-symbol-vector-20857678-removebg-preview.png");
            document.querySelector('.input_cupon').value = '';
        } else {
            // Verificăm dacă cuponul există în lista cupoanelor valabile
            if (cupoane.includes(reducere)) {
                // Verificăm dacă cuponul a fost deja folosit
                if (cupoane_expirate2.includes(reducere)) {
                    showToast2("Cuponul a fost folosit deja!", "imagini_altex/stop-sign-icon-in-flat-style-danger-symbol-vector-20857678-removebg-preview.png");
                } else {
                    // Dacă nu a fost folosit, aplicăm reducerea
                    suma_reducere += 50; // Ajustează valoarea reducerii
                    nr_cupoane += 1; // Incrementăm numărul de cupoane folosite

                    // Actualizăm UI-ul pentru numărul de cupoane
                    document.querySelector('.js-nr-cupoane').innerHTML = `(${nr_cupoane})`;

                    // Salvăm noile valori în localStorage
                    localStorage.setItem('nr_cupoane', nr_cupoane);
                    localStorage.setItem('suma_reducere', suma_reducere);

                    // Actualizăm costul coșului
                    cost_cos();

                    showToast("Cupon adugat cu succes!", "imagini_altex/ok_icon_preview.png");
                    // Adăugăm cuponul la lista de cupoane expirate (folosite)
                    cupoane_expirate2.push(reducere);
                    localStorage.setItem('cupoane_expirate2', JSON.stringify(cupoane_expirate2));

                }
            } else {
                showToast2("Cupon invalid!", "imagini_altex/stop-sign-icon-in-flat-style-danger-symbol-vector-20857678-removebg-preview.png");
            }

            document.querySelector('.input_cupon').value = '';
        }

    }

});

taxeSuplimentarePerProdus = JSON.parse(localStorage.getItem('taxeSuplimentarePerProdus')) || {};

document.querySelectorAll('.par2_garantie, .par3_garantie').forEach(grup => {
    const produsContainer = grup.closest('.div_center1');
    const productId = produsContainer.classList[1].replace('js-cart-item-container-', '');

    const tipGrup = grup.classList.contains('par2_garantie') ? 'grup2' : 'grup3';
    const key = `${productId}_${tipGrup}`;

    const butoane = grup.querySelectorAll('.icons_utilitare2');
    const taxaSelectata = taxeSuplimentarePerProdus[key];

    if (taxaSelectata !== undefined) {
        butoane.forEach((buton, index) => {
            if (index === 0) return;
            const valoareButon = parseFloat(buton.dataset.taxaSuplimentara) || 0;
            buton.src = (valoareButon === taxaSelectata) ?
                "imagini_altex/ok_icon_preview.png" :
                "imagini_altex/shape-circle-512.webp";
        });
    }

    butoane.forEach((buton, index) => {
        if (index === 0) return;

        buton.addEventListener('click', () => {
            const esteDejaSelectat = buton.src.includes("ok_icon_preview.png");

            if (esteDejaSelectat) {
                buton.src = "imagini_altex/shape-circle-512.webp";
                delete taxeSuplimentarePerProdus[key];
            } else {
                butoane.forEach((b, i) => {
                    if (i === 0) return;
                    b.src = "imagini_altex/shape-circle-512.webp";
                });

                buton.src = "imagini_altex/ok_icon_preview.png";
                const valoareTaxa = parseFloat(buton.dataset.taxaSuplimentara) || 0;
                taxeSuplimentarePerProdus[key] = valoareTaxa;
            }

            localStorage.setItem('taxeSuplimentarePerProdus', JSON.stringify(taxeSuplimentarePerProdus));
            cost_cos();


        });
    });
});


let favorite = JSON.parse(localStorage.getItem('favorite2')) || [];

document.querySelectorAll('.favorite').forEach((button) => {
    button.addEventListener('click', () => {
        const produsContainer = button.closest('.div_center1'); // găsim containerul produsului
        const productId = produsContainer.classList[1].replace('js-cart-item-container-', ''); // extragem ID-ul produsului din clasa containerului

        if (favorite.includes(productId)) {
            showToast("Produsul a fost adaugat deja!", "imagini_altex/ok_icon_preview.png");

        } else {
            favorite.push(productId);
            localStorage.setItem('favorite2', JSON.stringify(favorite));
            showToast("Produsul a fost adaugat cu succes!", "imagini_altex/ok_icon_preview.png");
        }

    });
});

let salvate = JSON.parse(localStorage.getItem('salvate')) || [];

document.querySelectorAll('.salveaza').forEach((button) => {
    button.addEventListener('click', () => {
        const produsContainer = button.closest('.div_center1'); // găsim containerul produsului
        const productId = produsContainer.classList[1].replace('js-cart-item-container-', ''); // extragem ID-ul produsului din clasa containerului

        if (salvate.includes(productId)) {
            showToast("Produsul a fost adaugat deja!", "imagini_altex/ok_icon_preview.png");
        } else {
            salvate.push(productId);
            localStorage.setItem('salvate', JSON.stringify(salvate));
            showToast("Produsul a fost adaugat cu succes!", "imagini_altex/ok_icon_preview.png");
        }

    });
});


let date_comanda = JSON.parse(localStorage.getItem('date_comanda2')) || [];

document.querySelector('.js-trimite-comanda').addEventListener('click', () => {
    cart.forEach((item) => {
        date_comanda.push({ id: item.productId, cantitate: `${item.quantity}` });
        localStorage.setItem('date_comanda2', JSON.stringify(date_comanda));
    });

    // Salvează costul final actual înainte de reset
    let cost_salvat = document.querySelector('.pret_total_pt_toate_produsele').textContent.replace(' lei', '');
    localStorage.setItem('cost_comanda_trimisa', cost_salvat);

    cart.length = 0;

    saveToStorage(cart);
    // Salvează datele necesare pentru comenzile.js
    localStorage.setItem('suma_reducere_factura', suma_reducere);
    localStorage.setItem('taxeSuplimentarePerProdus_factura', JSON.stringify(taxeSuplimentarePerProdus)); // salvăm separat

    // Apoi curăță localStorage-ul
    localStorage.removeItem('suma_reducere');
    localStorage.removeItem('nr_cupoane');
    localStorage.removeItem('cupoane_expirate2');
    localStorage.removeItem('taxeSuplimentarePerProdus');


    afisare_produse_cos();
    cost_cos();

    // Șterge produsele vizual
    document.querySelector('#produse_din_cos').innerHTML = '';

    // Resetează numărul de cupoane din UI
    document.querySelector('.js-nr-cupoane').innerHTML = '(0)';
    if (reducere) {
        cupoane_utilizate.push(reducere);
        localStorage.setItem('cupoane_utilizate', JSON.stringify(cupoane_utilizate));

    }

});

document.querySelectorAll('.js-imagine-produs').forEach((imagine) => {
    imagine.addEventListener('click', () => {

        const container = imagine.closest('[class*="js-cart-item-container-"]');

        if (container) {
            const clase = container.className;
            const match = clase.match(/js-cart-item-container-([\w-]+)/);

            if (match) {
                const id = match[1];
                localStorage.setItem('id_produs_accesat', id);
                window.location.href = 'Produs.html';
            }

        }
    });
});

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

function showToast2(message, imageUrl) {
    const toast = document.getElementById("toast2");
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
window.showToast = showToast2;

const mobil_Protect = document.querySelectorAll('[data_mobil_protect]');
mobil_Protect.forEach(buton => {
    buton.addEventListener('click', () => {
        const imgSelectat = buton.querySelector('img');

        // Verificăm dacă e deja selectat (are imaginea "ok")
        const esteSelectat = imgSelectat.src.includes("ok_icon_preview");

        if (esteSelectat) {
            // Deselectăm: punem imaginea golă și ștergem alegerea
            imgSelectat.src = "imagini_altex/shape-circle-512.webp";
            produs_individual.mobil_protect = "";
        } else {
            // Resetăm toate imaginile la cerc gol
            mobil_Protect.forEach(b => {
                const img = b.querySelector('img');
                if (img) {
                    img.src = "imagini_altex/shape-circle-512.webp";
                }
            });

            // Setăm imaginea "ok" pe cel apăsat
            imgSelectat.src = "imagini_altex/ok_icon_preview.png";

            // Setăm valoarea în funcție de butonul apăsat
            const valoare = buton.getAttribute('data_mobil_protect');
            switch (valoare) {
                case "1":
                    produs_individual.mobil_protect = "1 an";
                    break;
                case "2":
                    produs_individual.mobil_protect = "2 ani";
                    break;
            }
        }
    });
});