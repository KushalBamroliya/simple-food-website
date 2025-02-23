document.addEventListener('DOMContentLoaded', () => {
    const addtocartbutton = document.querySelectorAll('.add-to-cart');
    const cartitemcount = document.querySelector('.carticon span');
    const cartitemlist = document.querySelector('.carttems');
    const carttotal = document.querySelector('.carttotal');
    const carticon = document.querySelector('.carticon');
    const sidebar = document.getElementById('sidebar');

    let cartitem = [];
    let totalamount = 0;

    
    addtocartbutton.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.card .cartTitle')[index].textContent,
                price: parseFloat(document.querySelectorAll('.price')[index].textContent.slice(1)),
                quantity: 1,
            };

            const existingitem = cartitem.find((cartitem) => cartitem.name === item.name);
            if (existingitem) {
                existingitem.quantity++;
            } else {
                cartitem.push(item);
            }

            totalamount += item.price;
            updatecartui();
        });
    });

    function updatecartui() {
        updatecartitemcount(cartitem.length);
        updatecartitemlist();
        updatecarttotal();
    }

    function updatecartitemcount(count) {
        cartitemcount.textContent = count;
    }

    function updatecartitemlist() {
        cartitemlist.innerHTML = ''; 
        cartitem.forEach((item, index) => {
            const cartitems = document.createElement('div');
            cartitems.classList.add('cartitem', 'individualcartitem');
            cartitems.innerHTML = `
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="cartitemprice">₹${(item.price * item.quantity).toFixed(2)}
                    <button class="remove-btn" data-index="${index}">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </span>
            `;
            cartitemlist.append(cartitems);
        });

        const removebuttons = document.querySelectorAll('.remove-btn');
        removebuttons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                removeitemfromcart(index);
            });
        });
    }

    function removeitemfromcart(index) {
        const removeitem = cartitem.splice(index, 1)[0];
        totalamount -= removeitem.price * removeitem.quantity;
        updatecartui();
    }

    function updatecarttotal() {
        carttotal.textContent = `₹${totalamount.toFixed(2)}`;
    }

    carticon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    const closebutton = document.querySelector('.sidevarclose');
    closebutton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});
