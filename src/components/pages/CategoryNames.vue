<template>
    <ul class="categoryNameList">
      <li class="category-link" v-for="(category, index) in this.categories" :key="index">
        <a  ><router-link 
          :to="{ name: 'category', params: { categoryName: category.slug } }"
          >
          {{ category.name }}
        </router-link></a>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    name: "CategoryNames",
    data() {
      return {
        categories: {},
      };
    },
    methods: {
      organizeCategories(categories) {
        const menCategories = [];
        const womenCategories = [];
  
        // Loop through the categories and categorize them
        const otherCategories = categories.filter((category) => {
          if (category.slug.includes("womens")) {
            womenCategories.push(category); // Add women's category
            return false;
          } else if (category.slug.includes("mens")) {
            menCategories.push(category); // Add men's category
            return false;
          }
          return true; // Keep non-men/women categories as they are
        });
  
        // Create the new grouped structure
        const result = [
          menCategories.length > 0
            ? {
                slug: "men",
                name: "Men",
                categories: menCategories,
              }
            : null,
  
          womenCategories.length > 0
            ? {
                slug: "women",
                name: "Women",
                categories: womenCategories,
              }
            : null,
  
          ...otherCategories, // Add all non-men/women categories as they are
        ].filter(Boolean); // Remove any null values (if no men or women categories)
        return result;
      },
      selectCategory(categoryName) {
        // Emit the category name to the parent component (App.vue)
        this.$emit("category-selected", categoryName);
      },
    },
    beforeMount() {
      const axios = require("axios");
      axios
        .get("https://dummyjson.com/products/categories")
        .then((response) => {
          this.categories = this.organizeCategories(response.data);
          // this.categories=response.data;
          console.log(this.categories);
        })
        .catch((error) => {
          // Handle the error
          console.error("Error:", error);
        });
    },
  };
  </script>
  
  <style scoped>
  .categoryNameList {
    height:40px ;
    display: flex;
    justify-items: center;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-left: 10px;
    margin: 0px;
    column-gap: 24px;
    background-color: #87c2ad;
  }
  .categoryNameList::-webkit-scrollbar {
    display: none; /* Hide the scrollbar */
  }
  
  ul {
    list-style-type: none;
  }
  ul li {
    line-height: 15px;
    color: antiquewhite;
    width: auto;
  }
  a {
    font-size: small;
    color: rgba(0, 0, 0, 0.897);
    text-decoration-line: none;
  }
  ul li:hover { 
    color: rgb(45, 133, 18);
  }
  .category-link{
    height: auto;
  }
 .category-link:hover{
  background-color: #8aada1;
  border-radius: 5%;
 }
 .category-link:active{
  color: white;
 }
 @media (max-width: 584px) {
    .categoryNameList{
      column-gap: 10px;
    }
    ul li {
      width: auto;
    }
 }
  </style>
  
  
  
  
  