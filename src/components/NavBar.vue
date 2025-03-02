<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <router-link to="/"><a class="navbar-brand app-title" href="#">ShopLoom</a></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto d-flex flex-row gap-2">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'SignUp' }">SignUp</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'LoginPage' }">Login</router-link>
        </li>
      </ul>
    </div>
    <div>
      <form class="form-inline my-2 my-lg-0 search-form">
        <input ref="searchInput" class="form-control mr-sm-2 search-form-input" type="search" placeholder="Search"
          aria-label="Search" @input="searchProducts" />
      </form>
      <div v-if="filteredSearchProducts?.length !== 0" class="searchResults">
        <ul>
          <li v-for="(product, index) in filteredSearchProducts" :key="index" @click="goToProductPage(product.id)">
            <img :src="product.image" alt="" v-if="product.image" />
            <p>{{ product.title?.length > 35 ? product.title.substring(0, 34) + "..." : product.title }}</p>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>

export default {
  name: "NavBar",
  data() {
    return {
      allProducts: [],
      filteredSearchProducts: [],
    };
  },
  beforeMount() {
    const axios = require("axios");
    axios
      .get("https://dummyjson.com/products?limit=194")
      .then((response) => {
        response.data.products.forEach((product) => {
          this.allProducts.push({
            id: product.id,
            title: product.title,
            image: product.thumbnail,
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  },
  methods: {
    searchProducts(e) {
      const searchQuery = e.target.value.toLowerCase().trim();
      if (searchQuery === "") {
        this.filteredSearchProducts = [];
        return;
      }

      let startsWithMatches = [];
      let containsMatches = [];

      this.allProducts.forEach((product) => {
        let titleLower = product.title.toLowerCase();

        if (titleLower.startsWith(searchQuery)) {
          startsWithMatches.push({
            id: product.id,
            title: product.title,
            image: product.image,
          });
        } else if (titleLower.includes(" " + searchQuery) || titleLower.includes(searchQuery)) {
          containsMatches.push({
            id: product.id,
            title: product.title,
            image: product.image,
          });
        }
      });

      // Combine both lists: startsWith first, then contains
      this.filteredSearchProducts = [...startsWithMatches, ...containsMatches];
      if (this.filteredSearchProducts.length === 0) {
        this.filteredSearchProducts.push({ title: "No Products Found" });
      }
    },
    goToProductPage(id) {
      this.filteredSearchProducts = [];
      this.$refs.searchInput.value = "";
      this.$router.push({ name: 'product', params: { id } });
    }
  },
};
</script>

<style scoped>
nav {
  top: 0;
  left: 0;
  position: sticky !important;
  z-index: 999;
  background-color: rgb(9, 19, 82) !important;
}

.navbar-nav .nav-link {
  color: rgb(207, 128, 17) !important;
  padding-top: 0;
  padding-bottom: 0;
  border-radius: 9%;
  margin-right: 5%;
}

.navbar-nav .nav-link:hover {
  color: rgb(176, 125, 53) !important;
  background-color: rgb(28, 36, 84);
}


.navbar-nav .router-link-active {
  color: rgb(225, 155, 55) !important;
  font-weight: bold;
  background-color: rgb(28, 36, 84);
  border-radius: 9%;

}

.searchResults ul li {
  cursor: pointer;
}

a:hover {
  text-decoration: none;
}

button {
  border: none;
  background-color: #f8f9fa;
}

button:active {
  border: none;
}

.search-form {
  height: 40px;
  left: 70% !important;
}

.search-form-input {
  height: 32px !important;
  width: 300px !important;
}

.search-form-input:focus {
  border: 2px solid rgb(144, 102, 184);
}

.form-control:focus {
  box-shadow: none;
}

.search-form-btn {
  height: 32px;
  width: 32px;
}

.bi-search {
  margin: 0 !important;
  padding: 0 !important;
  text-align: center;
}

.searchResults {
  position: fixed;
  width: 300px;
  max-height: 300px;
  overflow-y: auto;
  background-color: rgb(230, 226, 226);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  padding: 1px;
  border-radius: 4px;
}

.searchResults ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;
}

.searchResults::-webkit-scrollbar {
  width: 6px;
}

/* Style the track (background of the scrollbar) */
.searchResults::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Style the thumb (the draggable part of the scrollbar) */
.searchResults::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.searchResults ul li {
  width: 100%;
  height: 28px;
  /* background-color: green; */
}

.searchResults ul li img {
  float: left;
  width: 25px;
  height: 25px;
}
.navbar-toggler-icon {
  filter: invert(100%) !important; /* This inverts the color to black */
}

/* Alternatively, you can use a custom background image */
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='black' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E") !important;
}
.searchResults ul li p {
  text-align: start;
  font-size: 14px;
}

@media (max-width: 584px) {
  .form-inline {
    display: inline-flex;
    flex-direction: row;
    gap: 10px;
  }
  
  .search-form {
    transform: translateX(0);
  }

  .form-control {
    flex: 1;
  }
  .navbar-nav {
  display: flex !important;
  flex-direction: row !important;
  gap: 10px; /* Adjust spacing as needed */
}
}
</style>