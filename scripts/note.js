document.querySelectorAll('.select_rating').forEach((button) => {
    button.addEventListener('click', (event) => {
        const butonActiv = event.currentTarget.classList.contains('activ');

        document.querySelectorAll('.select_rating').forEach((img) => {
            img.classList.remove('activ');
            img.src = "imagini_altex/white-medium-square-emoji-clipart-lg.png";
        });

        if (butonActiv) {
            rating = 0;
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

    });
});