const savedProducts = JSON.parse(localStorage.getItem("products"));
const nr_produse_cos = JSON.parse(localStorage.getItem('cartQuantity'));
let produse_cart = JSON.parse(localStorage.getItem('cart')) || [];
let produse_favorite = JSON.parse(localStorage.getItem('favorite2'));


//aici obtinem data si luna livrarii produselor 
let data_azi = new Date();
const ziua = data_azi.getDate();
const luna = data_azi.getMonth();
const lunaCurenta = luna + 1;
const luni = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
    "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
];


let id_produs = localStorage.getItem('id_produs_accesat');

let nume_produs = '';
let produsHTML = '';
savedProducts.forEach((produs) => {
    if (produs.id === id_produs) {
        nume_produs = produs.name;
        produsHTML = `<div>
                <p class="cod_produs">
                  Cod produs:  ${produs.cod_produs}
                </p>
                <p class="nume_produs">${produs.name}</p>
                <div class="rating_produs">
                    <div>
                        ${produs.rating.stars}
                    </div>
                    <div class="text_rating"> din 5</div>
                    <div class="text_rating">(${produs.rating.count})</div>

                </div>
            </div>

            <div class="produsul_dorit">
                <div>
                    <div>
                        <img class="icon_favorit js-icon-favorit" src="imagini_altex/11680212.png">
                    </div>

                    <div>
                        <img class="afisare_imagine_produs" src="${produs.image}">

                    </div>
                </div>

                <div class="optiuni">
                    <div>
                        <div class="PRP">
                            ${produs.pret_producator}
                        </div>

                        <div class="pretul">
                            ${produs.pret}
                        </div>

                        <div class="detalii_livrare">
                            <div>
                                <img class="icon_delivery" src="imagini_altex/pngtree-fast-delivery-icon-delivery-icon-png-image_2047531.jpg">
                            </div>

                            <div>
                                Livrare estimata in BUCURESTI pe
                            </div>

                            <div class="data_livrarii">
                                ${ziua + 3} ${luni[lunaCurenta]}
                            </div>
                        </div>

                        <div class="pret_livrare">
                            <div>
                                <img class="icon_coins" src="imagini_altex/10693138.png">
                            </div>

                            <div>
                                Cost de transport :
                            </div>

                            <div class="cost_transport">
                                incepand de la 14.9 lei
                            </div>


                        </div>

                        <div>
                            <button class="adauga_in_cos js-adauga-produs-in-cos">
                                Adauga in cos
                        </button>
                        </div>
                    </div>

                    <div class="culori_disponibile">

                        <div class="text_culori">
                            <p style="font-size: 19px;">Culoare: </p>
                            <p class = "culoare_dorita js-afisam-culoarea">
                                Negru
                            </p>
                        </div>

                        <div class="alege_culoare">
                            <button class="culoare_telefon js-alege-culoare">
                                Rosu
                            </button>

                            <button class="culoare_telefon js-alege-culoare">
                               Negru
                            </button>

                            <button class="culoare_telefon js-alege-culoare">
                               Alb
                            </button>
                        </div>

                    </div>

                    <div style="font-size: 19px; margin-top: 25px;">
                        Adauga servicii
                    </div>

                    <div class="garantii">
                        <p style="margin-bottom: 2px;">Adauga extra garantie</p>

                        <div class="asezare_garantii"  data_extra_garantie="1">
                            <img class="icon_circle" src="imagini_altex/shape-circle-512.webp">
                            <p style="margin-bottom: 0px; margin-top: 0px;">1 an - 48 lei</p>
                        </div>

                        <div class="asezare_garantii" data_extra_garantie="2">
                            <img class="icon_circle" src="imagini_altex/shape-circle-512.webp">
                            <p style="margin-bottom: 0px; margin-top: 0px;">2 an - 66 lei</p>
                        </div>

                        <div class="asezare_garantii" data_extra_garantie="3">
                            <img class="icon_circle" src="imagini_altex/shape-circle-512.webp">
                            <p style="margin-bottom: 0px; margin-top: 0px;">3 an - 108 lei</p>
                        </div>

                        <div class="asezare_garantii" data_extra_garantie="4">
                            <img class="icon_circle" src="imagini_altex/shape-circle-512.webp">
                            <p style="margin-bottom: 0px; margin-top: 0px;">4 an - 126 lei</p>
                        </div>

                        <p style="margin-bottom: 2px;">Adauga mobil protect</p>

                        <div class="mobil_protect">
                            <div class="asezare_garantii" data_mobil_protect="1">
                                <img class="icon_circle" src="imagini_altex/shape-circle-512.webp">
                                <p style="margin-bottom: 0px; margin-top: 0px;">1 an - 175 lei</p>
                            </div>

                            <div class="asezare_garantii" data_mobil_protect="2">
                                <img class="icon_circle" src="imagini_altex/shape-circle-512.webp">
                                <p style="margin-bottom: 0px; margin-top: 0px;">2 an - 345 lei</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <p style="margin-top: 60px; font-size: 30px;">
                Specificatii
            </p>

            <div class="specificatii">
                <div class="coloana_1">
                    <div>
                        <p class="tipuri_de_specificatii">
                            Caracteristici generale
                        </p>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Retea
                            </p>

                            <p>
                                4G
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Model
                            </p>

                            <p>
                                IPHONE 11
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                An lansare :
                            </p>

                            <p>
                                2024
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Incarcator inclus
                            </p>

                            <p>
                                Nu
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Sloturi Sim
                            </p>

                            <p>
                                Single SIM
                            </p>

                        </div>


                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Putere incarcator necesar
                            </p>

                            <p>
                                20-45W USB PD
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                SIM
                            </p>

                            <p>
                                Nano SIM
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Retea 2G
                            </p>

                            <p>
                                GSM/EDGE (850, 900, 1800, 1900 MHz)
                            </p>

                        </div>


                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Retea 3G
                            </p>

                            <p>
                                800, 850, 900, 1700/2100, 1900, 2100 MHz

                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Retea 4G
                            </p>

                            <p>
                                FDD (Bands 1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 17, 18, 19, 20, 25, 26, 29, 30, 66, 71), TDD (Bands 34, 38, 39, 40, 41, 42, 46, 48)
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Sistem de operare
                            </p>

                            <p>
                                iOS
                            </p>

                        </div>

                        <p class="tipuri_de_specificatii">
                            Ecran
                        </p>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Tip ecran
                            </p>

                            <p>
                                Liquid Retina HD

                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Dimensiune ecran
                            </p>

                            <p>
                                6.1 inch
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Rezolutie ecran (pixeli)
                            </p>

                            <p>
                                1792 x 828

                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Alte specificatii ecran
                            </p>

                            <p>
                                LCD Multi-Touch display cu Tehnologie IPS
                            </p>

                        </div>

                        <p class="tipuri_de_specificatii">
                            Memorie
                        </p>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Capacitate stocare
                            </p>

                            <p>
                                64 GB
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Memorie RAM
                            </p>

                            <p>
                                4 GB
                            </p>

                        </div>

                        <p class="tipuri_de_specificatii">
                            Procesor
                        </p>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Tip procesor
                            </p>

                            <p>
                                Hexa Core
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Procesor
                            </p>

                            <p>
                                A13 Bionic chip, Neural Engine Generatia a treia
                            </p>

                        </div>

                        <p class="tipuri_de_specificatii">
                            Foto video
                        </p>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Retea
                            </p>

                            <p>
                                4G
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Model
                            </p>

                            <p>
                                IPHONE 11
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                An lansare :
                            </p>

                            <p>
                                2024
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Incarcator inclus
                            </p>

                            <p>
                                Nu
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Sloturi Sim
                            </p>

                            <p>
                                Single SIM
                            </p>

                        </div>


                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Putere incarcator necesar
                            </p>

                            <p>
                                20-45W USB PD
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                SIM
                            </p>

                            <p>
                                Nano SIM
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Retea 2G
                            </p>

                            <p>
                                GSM/EDGE (850, 900, 1800, 1900 MHz)
                            </p>

                        </div>

                        <p class="tipuri_de_specificatii">
                            Date
                        </p>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Tip procesor
                            </p>

                            <p>
                                Hexa Core
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Procesor
                            </p>

                            <p>
                                A13 Bionic chip, Neural Engine Generatia a treia
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Tip procesor
                            </p>

                            <p>
                                Hexa Core
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Procesor
                            </p>

                            <p>
                                A13 Bionic chip, Neural Engine Generatia a treia
                            </p>

                        </div>

                        <div class="pozitionare_specificatii">
                            <p class="specificatia">
                                Procesor
                            </p>

                            <p>
                                A13 Bionic chip, Neural Engine Generatia a treia
                            </p>

                        </div>
                    </div>
                </div>

                <div class="coloana_2">
                    <p class="tipuri_de_specificatii">
                        Informatii suplimentare
                    </p>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Tip procesor
                        </p>

                        <p>
                            Hexa Core
                        </p>

                    </div>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Procesor
                        </p>

                        <p>
                            A13 Bionic chip, Neural Engine Generatia a treia
                        </p>

                    </div>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Tip procesor
                        </p>

                        <p>
                            Hexa Core
                        </p>

                    </div>

                    <p class="tipuri_de_specificatii">
                        Baterie
                    </p>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Tip procesor
                        </p>

                        <p>
                            Hexa Core
                        </p>

                    </div>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Procesor
                        </p>

                        <p>
                            A13 Bionic chip, Neural Engine Generatia a treia
                        </p>

                    </div>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Tip procesor
                        </p>

                        <p>
                            Hexa Core
                        </p>

                    </div>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Tip procesor
                        </p>

                        <p>
                            Hexa Core
                        </p>

                    </div>

                    <p class="tipuri_de_specificatii">
                        Altele
                    </p>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Tip procesor
                        </p>

                        <p>
                            Hexa Core
                        </p>

                    </div>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Procesor
                        </p>

                        <p>
                            A13 Bionic chip, Neural Engine Generatia a treia
                        </p>

                    </div>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Tip procesor
                        </p>

                        <p>
                            Hexa Core
                        </p>

                    </div>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Tip procesor
                        </p>

                        <p>
                            Hexa Core
                        </p>

                    </div>

                    <p class="tipuri_de_specificatii">
                        Garantie
                    </p>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Tip procesor
                        </p>

                        <p>
                            Hexa Core
                        </p>

                    </div>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Procesor
                        </p>

                        <p>
                            A13 Bionic chip, Neural Engine Generatia a treia
                        </p>

                    </div>

                    <p class="tipuri_de_specificatii">
                        Generale
                    </p>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Tip procesor
                        </p>

                        <p>
                            Hexa Core
                        </p>

                    </div>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Procesor
                        </p>

                        <p>
                            A13 Bionic chip, Neural Engine Generatia a treia
                        </p>

                    </div>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Tip procesor
                        </p>

                        <p>
                            Hexa Core
                        </p>

                    </div>

                    <div class="pozitionare_specificatii">
                        <p class="specificatia">
                            Tip procesor
                        </p>

                        <p>
                            Hexa Core
                        </p>

                    </div>


                </div>
            </div>

            <div class="telefoane">

                <div style="margin-bottom : 30px ; font-family: Arial, Helvetica, sans-serif; font-size: 30px;">
                    Produse similare
                </div>

                <div class="produse_similare">
                   
                </div>

            </div>`;
    }
});
document.querySelector('.js-incarcam-produs-in-pagina').innerHTML = produsHTML;

let nr_produse_similare = 0;
//afisam produse similare
let produse_similare = '';
savedProducts.forEach(product => {
    if (nr_produse_similare < 5 && product.id !== id_produs && nume_produs.toLowerCase().includes(product.producator.toLocaleLowerCase())) {

        produse_similare += `<div class="structura_produs">
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
        nr_produse_similare += 1;

    }

});

document.querySelector('.produse_similare').innerHTML = produse_similare;

//daca apasam pe un produs similar el se va incarca in pagina
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

function adauga_in_cos(id_produs) {
    let matchingItem;

    produse_cart.forEach((item) => {
        if (id_produs === item.productId) {
            matchingItem = item;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        produse_cart.push({
            productId: id_produs,
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(produse_cart));

    num_prod();
}

//aici facem butonul 'adauga in cos' sa functioneze pentru produsul accesat
document.querySelector(".js-adauga-produs-in-cos").addEventListener("click", () => {
    adauga_in_cos(id_produs);
    lista_produse_individuale.push(produs_individual);
    localStorage.setItem("produse_individuale", JSON.stringify(lista_produse_individuale));
    showToast("Cosul a fost actualizat cu succes!", "imagini_altex/ok_icon_preview.png");
    console.log(lista_produse_individuale);

});

//aici facem butonul 'adauga in cos' sa functioneze pentru produsul similare
document.querySelectorAll('.js-add-to-cart').forEach(buton => {
    buton.addEventListener('click', (event) => {
        event.stopPropagation();
        const id_produs_selectat = buton.getAttribute('data-product-id');
        adauga_in_cos(id_produs_selectat);
        showToast("Cosul a fost actualizat cu succes!", "imagini_altex/ok_icon_preview.png");

    });
});



num_prod();

function num_prod() {
    num = 0;
    produse_cart.forEach((item) => {
        num += item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = num;

};



document.querySelector('.js-icon-favorit').addEventListener("click", () => {

    if (!produse_favorite.includes(id_produs)) {
        produse_favorite.push(id_produs);
        localStorage.setItem('favorite2', JSON.stringify(produse_favorite));
        alert("Produs adăugat cu succes");
        document.querySelector('.nr_de_produse_favorite ').innerHTML = produse_favorite.length;
    } else {
        alert("Produsul este deja în lista de favorite");
    }
});


document.querySelectorAll('.js-alege-culoare').forEach(elem => {
    elem.addEventListener("click", () => {
        document.querySelector('.js-afisam-culoarea').innerHTML = elem.innerText;
    })
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

let lista_produse_individuale = JSON.parse(localStorage.getItem("produse_individuale")) || [];
//stocam date despre un eventual produs care va ajunge in cos
let produs_individual = {
    id: id_produs,
    extra_garantie: "",
    mobil_protect: ""
};

// Butoane pentru extra garanție
const extraGarantie = document.querySelectorAll('[data_extra_garantie]');

extraGarantie.forEach(buton => {
    buton.addEventListener('click', () => {
        const imgSelectat = buton.querySelector('img');

        // Verificăm dacă e deja selectat
        const esteSelectata = imgSelectat.src.includes("ok_icon_preview");

        if (esteSelectata) {
            // Deselectăm butonul
            imgSelectat.src = "imagini_altex/shape-circle-512.webp";
            produs_individual.extra_garantie = "";
        } else {
            // Resetăm toate imaginile
            extraGarantie.forEach(b => {
                const img = b.querySelector('img');
                if (img) {
                    img.src = "imagini_altex/shape-circle-512.webp";
                }
            });

            // Setăm imaginea selectată
            imgSelectat.src = "imagini_altex/ok_icon_preview.png";

            // Setăm valoarea extra garanției
            const valoare = buton.getAttribute('data_extra_garantie');
            switch (valoare) {
                case "1":
                    produs_individual.extra_garantie = "1 an";
                    break;
                case "2":
                    produs_individual.extra_garantie = "2 ani";
                    break;
                case "3":
                    produs_individual.extra_garantie = "3 ani";
                    break;
                case "4":
                    produs_individual.extra_garantie = "4 ani";
                    break;
            }
        }

    });
});


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

//lista_produse_individuale = [];
//localStorage.setItem("produse_individuale", JSON.stringify(lista_produse_individuale));
console.log(lista_produse_individuale);