<template>
  <div v-if="subCategories.length !== 0">
    <ul class="nav">
      <li class="nav-item subCategory" v-for="(subCategory, index) in subCategories" :key="index">
        <a href="" class="nav-link"><router-link :to="{ name: 'category', params: { categoryName: subCategory.slug } }"
            class="category-link">
            {{ subCategory.name.split(' ')[1] }}
          </router-link></a>
      </li>
    </ul>

  </div>
  <div class="productCards">
    <div v-for="(product, index) in products" :key="index" class="productCardWrapper">
      <ProductCard :product="product" />
    </div>
  </div>
  <div class="noProducts">
    <p v-if="products && products.length === 0" style="color: red">
      No Products Available in this category
    </p>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";


const axios = require("axios");
export default {
  name: "CategoryProducts",
  props: {
    categoryName: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      product: {},
      Url: "https://dummyjson.com/products?limit=10&skip=10",
      products: [],
      subCategories: []
    };
  },
  components: {
    ProductCard,
  },
  mounted() {
    console.log('mounted');
    this.updateUrl(this.categoryName);
    this.fetchProducts(this.Url);
  },
  watch: {
    async categoryName(newCategoryName) {
      this.updateUrl(newCategoryName);
      this.fetchProducts(this.Url);
    }
  },
  methods: {
    async updateSubCategories(category) {
      console.log('sub');
      await axios
        .get("https://dummyjson.com/products/categories")
        .then(response => {
          this.subCategories = response.data.filter(item => item.slug.startsWith(category));
        })
        .catch(error => {
          console.log("Error fetching subcategories: ", error);
        })
      console.log(this.subCategories)
    },
    async fetchProducts(url) {
      console.log('products');
      await axios
        .get(url)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((error) => {
          console.log("Error fetching products:", error);
        });

    },
    async updateUrl(categoryNameForUrl) {
      console.log('url');
      console.log(categoryNameForUrl)
      if (categoryNameForUrl === "" || categoryNameForUrl === "all") {
        this.Url = "https://dummyjson.com/products?limit=10&skip=10";
        this.subCategories = [];
      }
      else if (categoryNameForUrl.startsWith('men') || categoryNameForUrl.startsWith('women')) {
        await this.updateSubCategories(categoryNameForUrl.startsWith('men') ? 'men' : 'women');
        this.Url = categoryNameForUrl === 'men' || categoryNameForUrl === 'women' ?
          `https://dummyjson.com/products/category/${this.subCategories[0].slug}` :
          `https://dummyjson.com/products/category/${categoryNameForUrl}`;
        this.fetchProducts(this.Url);
      }
      else {
        this.Url = `https://dummyjson.com/products/category/${categoryNameForUrl}`;
        this.subCategories = [];
      }
    }
  }
};
</script>

<style scoped>
.nav {
  background-color: rgb(234, 236, 236);
  display: flex;
  justify-content: center; /* Centers the entire nav */
  padding: 0;
}

.nav ul {
  list-style: none;
  display: flex;
  padding: 0 !important;
}

.subCategory {
  display: flex;
}
.subCategory:hover{
  background-color: rgb(219, 216, 216);
  color: white;
}
.productCards {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
a{
  text-decoration-line: none;
}
.productCardWrapper {
  width: 15.85%;
  /* Each product takes up 1/6th of the width (100% / 6) */
  box-sizing: border-box;
  /* Ensures padding/borders are included in the width calculation */
  display: flex;
  justify-content: center;
  /* Centers the ProductCard component horizontally */
}

ProductCard {
  width: 100%;
  max-width: 100%;
}

@media (max-width: 584px) {
  .productCardWrapper {
    width: 45%;
  }
}
</style>