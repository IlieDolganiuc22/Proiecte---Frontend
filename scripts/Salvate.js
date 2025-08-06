import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';

const favorite = JSON.parse(localStorage.getItem('favorite2'));
const salvate = JSON.parse(localStorage.getItem('salvate'));
document.querySelector('.nr_de_produse_salvate').innerHTML = salvate.length;
document.querySelector('.nr_de_produse_favorite2').innerHTML = favorite.length;

function afisare_produse_salvate() {

    let cartSummaryHTML = '';


    salvate.forEach((salvat) => {
        const productId = salvat;

        let matchingProduct;

        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }

        });

        cartSummaryHTML += ` 
   <div class="structura_produs_salvat js-cart-item-container-${matchingProduct.id}">
                            <img class="imagini_telefoane" src="${matchingProduct.image}">
                            <p class="info_tel">${matchingProduct.name}</p>
                            <p style="margin-left: 21px; margin-bottom : 0px ">In stoc</p>
                            <div class="strucura_stele">
                               ${matchingProduct.rating.stars}
                            </div>
                            <p class="info_pret_producator">${matchingProduct.pret_producator}</p>
                            <p class="pret">${matchingProduct.pret}</p>
                            <button class="button_add js-add-to-cart" data-product-id="${matchingProduct.id}">Adauga in cos</button>
                            <p class="text_produs_favorit sterge-produs-favorit sterge-produs-salvat">Sterge</p>

                        </div>
`;


    });

    document.querySelector('.afisare_telefoane_salvate').innerHTML = cartSummaryHTML;

    //cand apasam pe butonul adauga in cos se porneste functia asta 
    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            //verifica carui produs corespunde butonul si stocheaza id sau
            const productId = button.dataset.productId;

            addToCart(productId);

            updateCartQuantity();
            showToast("Cos actualizat cu succes!", "imagini_altex/ok_icon_preview.png");

        });
    });

    document.querySelectorAll('.structura_produs_salvat').forEach((produs) => {
        produs.addEventListener('click', (event) => {
            // Dacă s-a dat click pe butonul „Adaugă în coș”, nu face nimic
            if (event.target.classList.contains('js-add-to-cart') || event.target.classList.contains('text_produs_favorit')) return;


            // Găsim butonul din interiorul produsului curent
            const buton = produs.querySelector('.js-add-to-cart');
            console.log(buton);
            if (buton) {
                //extragem id produsului din acel buton
                const id = buton.getAttribute('data-product-id');
                localStorage.setItem('id_produs_accesat', id);

                // Redirecționează către pagina Produs.html
                window.location.href = 'Produs.html';
            }
        });
    });

    sterge_salvat();
}

produsele_salvate();


function produsele_salvate() {
    if (salvate.length === 0) {
        let lipsa_salvate = ` <div class="cosul_gol">
                            <img src="imagini_altex/11820237.png" class="icon_lipsesc_salvate">
                            <p class = "text_lipsesc_salvate">Nu exista produse salvate.</p>
                            <a href="Altex_site.html" class = "button_cos_gol">Mergi la pagina principala</a>
                        </div>`;
        document.querySelector('.afisare_telefoane_salvate').innerHTML = lipsa_salvate;

    }

}


function sterge_salvat() {
    document.querySelectorAll('.sterge-produs-salvat').forEach((button) => {
        button.addEventListener('click', () => {

            const produsContainer = button.closest('.structura_produs_salvat'); // găsim containerul produsului
            const productId = produsContainer.classList[1].replace('js-cart-item-container-', ''); // extragem ID-ul produsului din clasa containerului

            const index = salvate.indexOf(productId);
            if (index !== -1) {
                salvate.splice(index, 1);
                localStorage.setItem('salvate', JSON.stringify(salvate));
                afisare_produse_salvate();
                document.querySelector('.nr_de_produse_salvate').innerHTML = salvate.length;
            }
            showToast("Produsul a fost sters cu succes!", "imagini_altex/ok_icon_preview.png");
        });
    });
    produsele_salvate();

}

function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

updateCartQuantity();
afisare_produse_salvate();

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