//daca sunt salvate produse e ok , daca nu aduga 2 produse mentionate mai jos
export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {

    cart = [];

}

//salvam datele
export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

//verifica produsul selectat daca deja exista in cos
export function addToCart(productId) {
    let matchingItem;
    //daca exista se stocheaza in matchingItem
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    //daca matchingItem este definit se adauga cantitatea cu 1 daca nu se adauga produsul in cos
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1
        });

    }

    saveToStorage();
}

//stergem produsele
export function removeFromCart(productId) {
    const newCart = [];
    //toate produsele cu exceptia celui selectat spre stergere se aduga in newCart
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    //introducem in cart elementele nesterse
    cart = newCart;

    saveToStorage();
};