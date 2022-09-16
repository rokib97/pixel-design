let dataSet;
fetch("../data.json")
  .then((res) => res.json())
  .then((data) => {
    dataSet = data;
    displayData(data);
  });

const phoneDatas = async () => {
  const res = await fetch("../data.json");
  const data = await res.json();
  displayData(data);
};
phoneDatas();

function displayData(data) {
  const cardContainer = document.getElementById("homepage-content");
  data.forEach((element) => {
    const { id, img, price, name } = element;
    const divContainer = document.createElement("div");
    divContainer.classList.add("card", "bg-base-100", "shadow-2xl", "p-4");
    divContainer.innerHTML = `
    <figure class="">
      <img
        src="${img}"
        alt="Shoes"
        class="rounded-lg w-full h-[300px]"
      />
    </figure>

    <div class="mt-[20px]">
      <div class="flex justify-between">
        <h2 class="card-title">${name}</h2>
        <div class="flex text-lg">
          <span class="mr-4"
            ><i class="fa-solid fa-heart text-slate-500"></i
          ></span>
          <span
            ><i class="fa-solid fa-square-minus text-red-700"></i
          ></span>
        </div>
      </div>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <h3 class="card-title">Price: ${price}</h3>
      <div class="mt-2 flex justify-between">
        <label
        onclick="handleModal('${id}')"
          for="my-modal-3"
          class="btn btn-outline btn-primary w-[45%] mx-auto flex justify-center items-center"
        >
          <i class="fa-solid fa-circle-info mr-2"></i> See Details
        </label>

        <button
        onclick="handleBuyNow('${id}')"
          class="btn btn-outline btn-secondary w-[45%] mx-auto block"
        >
          <i class="fa-solid fa-bag-shopping mr-2"></i>Buy Now
        </button>
      </div>
  </div>
    
    `;
    cardContainer.appendChild(divContainer);
  });
}

function handleModal(id) {
  const product = dataSet.find((item) => item.id === id);
  const { name, price, img } = product;
  const modalContainer = document.getElementById("modal-info");
  modalContainer.innerHTML = `
  <div>
  <img
    src="${img}"
    class="w-[100%] h-[200px] mx-auto object-cover"
    alt=""
  />
</div>
<!-- modal infos -->
<div>
  <h1 class="font-semibold text-xl my-2">
    <span class="text-primary">PRODUCT : </span> ${name}
  </h1>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis
    dolorem provident hic sed vitae nulla accusamus? Quas cupiditate
    iure nostrum iusto accusantium perspiciatis ad veniam quae
    quisquam perferendis
  </p>
  <div class="my-2">
    <h1 class="font-semibold text-xl text-primary">FEATURES :</h1>
    <p>feature01,feature02, feature03, feature04</p>
  </div>
  <p class="font-semibold text-xl">
    <span class="text-primary">PRICE : </span> $<span>${price}</span>
  </p>
</div>
  `;
}
let count = 0;
let newPrice = 0;
let tax = 0;
function handleBuyNow(id) {
  // count++
  count = count + 1; //1 //2
  const product = dataSet.find((item) => item.id === id);
  const { name, price, img } = product;
  newPrice = newPrice + product.price;
  tax = newPrice * 0.1;
  const cartContainer = document.getElementById("cart-items-container");
  const div = document.createElement("div");
  div.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "p-2",
    "rounded-md",
    "mb-4",
    "cart-item-style"
  );
  div.innerHTML = `

  <img
    src="${img}"
    class="w-[15%]"
    alt=""
  />
  <div class="flex items-center justify-between w-[80%]">
    <h1 class="font-semibold">${name}</h1>
    <input
      type="text"
      class="border-2 border-green-800 w-10 text-center rounded-md"
      value="1"
      readonly
    />
    <span
      ><i
        class="fa-sharp fa-solid fa-trash text-red-700 cursor-pointer text-xl"
      ></i
    ></span>

</div>
  
  `;
  cartContainer.appendChild(div);
  document.getElementById("badge-count").innerText = count;
  document.getElementById("product-count").innerText = count;
  document.getElementById("price").innerText = newPrice.toFixed(2);
  document.getElementById("tax-count").innerText = tax.toFixed(2);
  document.getElementById("total-price").innerText = (newPrice + tax).toFixed(
    2
  );
}

function handleClear() {
  document.getElementById("cart-items-container").innerHTML = "";
}
