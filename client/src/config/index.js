export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "vegetable", label: "Vegetables" },
      { id: "oil", label: "Oil" },
      { id: "grain", label: "Grain" },
      { id: "egg", label: "Egg" },
      { id: "fish", label: "Fish" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "vegetable", label: "Vegetables" },
      { id: "fortune_refined_oil", label: "Fortune Refined Oil" },
      { id: "fortune_mustard_oil", label: "Fortune Mustard Oil" },
      { id: "Rice", label: "Local Rice" },
      { id: "india_gate", label: "India Gate" },
      { id: "aashirvaad_atta", label: "Aashirvaad Atta" },
      { id: "local_atta", label: "Local Atta" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  { id: "home", label: "Home", path: "/shop/home" },
  { id: "products", label: "Products", path: "/shop/listing" },
  { id: "vegetable", label: "Vegetable", path: "/shop/listing" },
  { id: "oil", label: "Oil", path: "/shop/listing" },
  { id: "grain", label: "Grain", path: "/shop/listing" },
  { id: "egg", label: "Egg", path: "/shop/listing" },
  { id: "fish", label: "Fish", path: "/shop/listing" },
  { id: "search", label: "Search", path: "/shop/search" },
];

export const categoryOptionsMap = {
  vegetable: "Vegetable", 
  oil: "Oil",
  grain: "Grain",
  egg: "Egg",
  fish: "Fish",
};

export const brandOptionsMap = {
  vegetable: "Vegetables",
  fortune_refined_oil: "Fortune Refined Oil",
  fortune_mustard_oil: "Fortune Mustard Oil",
  Rice:"Local Rice",
  india_gate: "India Gate",
  aashirvaad_atta: "Aashirvaad Atta",
  local_atta: "Local Atta",
};

export const filterOptions = {
  category: [
    { id: "vegetable", label: "Vegetables" },
    { id: "oil", label: "Oil" },
    { id: "grain", label: "Grain" },
    { id: "egg", label: "Egg" },
    { id: "fish", label: "Fish" },
  ],
  brand: [
    { id: "vegetable", label: "Vegetables" },
    { id: "fortune_refined_oil", label: "Fortune Refined Oil" },
    { id: "fortune_mustard_oil", label: "Fortune Mustard Oil" },
    { id: "Rice", label: "Local Rice"},
    { id: "india_gate", label: "India Gate" },
    { id: "aashirvaad_atta", label: "Aashirvaad Atta" },
    { id: "local_atta", label: "Local Atta" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
