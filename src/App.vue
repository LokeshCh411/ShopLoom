<template>
  <div>
    <NavBar />
    <CategoryNames @category-selected="setCurrentCategory" />
    <div>
      <router-link to="/"></router-link>
      <router-link to="/login"></router-link>
      <router-link to="/signup"></router-link>
      <router-link :to="{ name: 'category', params: { categoryName: 'all' } }"></router-link>
      <router-view />
    </div>
  </div>
</template>
<script>
import NavBar from "./components/NavBar.vue";
import CategoryNames from "./components/pages/CategoryNames.vue";
// import CategoryProducts from './components/Product/CategoryProducts.vue';
export default {
  name: "App",
  data() {
    return {
      product: {},
      categoryName: "all",
    };
  },
  components: {
    NavBar,
    CategoryNames
  },
};
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.productCards {
  display: flex;
  flex-wrap: wrap;

  gap: 10px;
  width: 100%; /* Makes sure the container takes up the full screen width */
  /* height: 400px; */
  padding: 15px;
}

.productCardWrapper {
  width: 15.85%; /* Each product takes up 1/6th of the width (100% / 6) */
  box-sizing: border-box; /* Ensures padding/borders are included in the width calculation */
  display: flex;
  justify-content: center; /* Centers the ProductCard component horizontally */
}

ProductCard {
  width: 100%;
  max-width: 100%;
}

</style>
