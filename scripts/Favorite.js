import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';


const favorite = JSON.parse(localStorage.getItem('favorite2'));
document.querySelector('.nr_de_produse_favorite2').innerHTML = favorite.length;
const salvate = JSON.parse(localStorage.getItem('salvate'));
document.querySelector('.nr_de_produse_salvate').innerHTML = salvate.length;

function afisare_produse_favorite() {

    let cartSummaryHTML = '';


    favorite.forEach((favorit) => {
        const productId = favorit;

        let matchingProduct;

        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }

        });

        cartSummaryHTML += ` 
   <div class="structura_produs_favotit js-cart-item-container-${matchingProduct.id}">
                            <img class="imagini_telefoane" src="${matchingProduct.image}">
                            <p class="info_tel">${matchingProduct.name}</p>
                            <p style="margin-left: 21px; margin-top : 15px ;  margin-bottom : 5px">In stoc</p>
                            <div class="strucura_stele">
                               ${matchingProduct.rating.stars}
                            </div>
                            <p class="info_pret_producator">${matchingProduct.pret_producator}</p>
                            <p class="pret">${matchingProduct.pret}</p>
                            <button class="button_add js-add-to-cart" data-product-id="${matchingProduct.id}">Adauga in cos</button>
                            <p class="text_produs_favorit sterge-produs-favorit">Sterge</p>

                        </div>
`;


    });

    document.querySelector('.afisare_telefoane_favorite2').innerHTML = cartSummaryHTML;

    sterge_favorite();

    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            addToCart(productId);
            updateCartQuantity();
            showToast("Cos actualizat cu succes!", "imagini_altex/ok_icon_preview.png");
        });
    });

}

lipsesc_favorite();


function lipsesc_favorite() {
    if (favorite.length === 0) {
        let lipsa_favorite = ` <div class="cosul_gol">
                            <img src="imagini_altex/c9bf3b56d35fca4031933c47e1a3c38d.jpg" class="icon_lipsesc_favorite">
                            <p class = "text_lipsesc_favorite">Nu exista produse favorite.</p>
                            <p class = "text_lipsesc_favorite">Adauga produsele favorite si revino.</p>
                            <a href="Altex_site.html" class = "button_cos_gol">Mergi la pagina principala</a>
                        </div>`;
        document.querySelector('.afisare_telefoane_favorite2').innerHTML = lipsa_favorite;

    }

}

function sterge_favorite() {
    document.querySelectorAll('.sterge-produs-favorit').forEach((button) => {
        button.addEventListener('click', () => {

            const produsContainer = button.closest('.structura_produs_favotit'); // găsim containerul produsului
            const productId = produsContainer.classList[1].replace('js-cart-item-container-', ''); // extragem ID-ul produsului din clasa containerului

            const index = favorite.indexOf(productId);
            if (index !== -1) {
                favorite.splice(index, 1);
                localStorage.setItem('favorite2', JSON.stringify(favorite));
                console.log(favorite);
                afisare_produse_favorite();
                document.querySelector('.nr_de_produse_favorite2').innerHTML = favorite.length;

            }
            showToast("Produsul a fost sters cu succes!", "imagini_altex/ok_icon_preview.png");

        });
    });
    lipsesc_favorite();
}

function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

updateCartQuantity();
afisare_produse_favorite();

document.querySelectorAll('.structura_produs_favotit').forEach((produs) => {
    produs.addEventListener('click', (event) => {
        // Dacă s-a dat click pe butonul „Adaugă în coș”, nu face nimic
        if (event.target.classList.contains('js-add-to-cart') || event.target.classList.contains('text_produs_favorit')) return;

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