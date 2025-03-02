<template>
  <div class="page">
    <div class="product productImage">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators" v-if="product.images.length > 1">
          <li v-for="(img, index) in product.images" :key="index" data-target="#carouselExampleIndicators"
            :data-slide-to="index" :class="{ active: index === 0 }"></li>
        </ol>
        <div class="carousel-inner">
          <div v-for="(img, index) in product.images" :key="index" :class="['carousel-item', { active: index === 0 }]">
            <img :src="img" class="d-block w-100 productImages" alt="..."  />
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" v-if="product.images.length > 1">
          <span class="fas fa-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" v-if="product.images.length > 1">
          <span class="fas fa-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <div class="product productDetails">
      <div class="productTitle">
        <div class="titleAndRating">
          <p class="title">
            <strong>{{ product.title }}</strong>
          </p>
          <div class="topRating" v-if="product.reviews && product.reviews.length !== 0">
            <span v-for="(i, ind) in Array(5).fill(1)" :key="ind" :class="{ star: ind < Math.trunc(productRating) }"
              class="ratingIcons">
              &#9733;
            </span>
            <span>
              {{ productRating.toFixed(1) }}</span>
          </div>
        </div>
        <p class="description">{{ product.description }}</p>
        <p class="brands">Brand : {{ product.brand }}</p>
        <p class="price">
          <strong>Rs.{{ product.price + " " }} </strong>
          <small>
            <del class="originalAmount">Rs.{{
              (
                (100 * product.price) /
                (100 - product.discountPercentage)
              ).toFixed(2)
            }}</del>
            <small class="discount"> {{ " " + product.discountPercentage }}% OFF</small></small>
        </p>
      </div>
      <div class="additionalInfo">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Category</td>
              <td>{{ product.category ? product.category : "NA" }}</td>
            </tr>
            <tr>
              <td>Brand</td>
              <td>{{ product.brand ? product.brand : "NA" }}</td>
            </tr>
            <tr>
              <td>InStock</td>
              <td>{{ product.stock == 0 ? "Not Avaialble" : "Available" }}</td>
            </tr>
            <tr>
              <td>Warranty</td>
              <td>{{ product.warrantyInformation }}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>{{ product.shippingInformation }}</td>
            </tr>
            <tr>
              <td>Return Policy</td>
              <td>{{ product.returnPolicy }}</td>
            </tr>
          </tbody>
        </table>
        <div class="reviews">
          <div class="rating">
            <p><strong>Reviews</strong></p>
            <div class="review" v-for="(review, index) in this.product.reviews" :key="index">
              <div class="titleAndRating">
                <p class="reviewerName">
                  <span class="profile">
                    <span>{{
                      review.reviewerName
                        .split(" ")
                        .map((ele) => ele.charAt(0))
                        .join("")
                    }}</span>
                  </span>
                  <span class="name"> {{ review.reviewerName }}</span>
                </p>
                <p>
                  <span v-for="(i, ind) in Array(5).fill(1)" :key="ind" :class="{ star: ind < review.rating }"
                    class="ratingIcon">
                    &#9733;
                  </span>
                  <span> {{ review.rating }}</span>
                </p>
              </div>
              <p class="reviewerEmail">
                @{{ review.reviewerEmail.replace("@x.dummyjson.com", "") }}
              </p>
              <pre class="reviewDescription">{{ review.comment }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ProductPage",
  props: {
    id: String,
  },
  data() {
    return {
      product: {
        images:[]
      },
      productRating: 0
    }
  },
  async beforeMount() {
    await axios.get(`https://dummyjson.com/products/${this.id}`)
      .then((response) => {
        this.product = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  watch: {
    product(newProduct) {
      if (newProduct.reviews && newProduct.reviews.length !== 0) {
        this.productRating = newProduct.reviews.reduce((sum, review) => sum + review.rating, 0) / newProduct.reviews.length;
      } else {
        this.productRating = 0;
      }

    },
    async id(newId) {
      await axios.get(`https://dummyjson.com/products/${newId}`)
        .then((response) => {
          this.product = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

};
</script>

<style >
/* .productImage{
    background-color: green;
  } */
/* Change the color of the left (previous) arrow */
.carousel-control-prev .fas {
  color: #ff5733;
}

/* Change the color of the right (next) arrow */
.carousel-control-next .fas {
  color: #ff5733;
}

.carousel-indicator li {
  background-color: rgb(146, 15, 15);
}

.page {
  display: flex;
  flex-direction: row;
}

.productImage {
  flex: 0 0 40%;
}

.titleAndRating {
  width: 100%;
  display: inline-flex;
}

.topRating {
  text-align: end;
  flex: 1;
}

.ratingIcons {
  font-size: 20px;
}

.productDetails {
  text-align: start;
  padding: 10px;
  flex: 0 0 60%;
}

.originalAmount {
  color: rgba(255, 0, 0, 0.872);
  text-decoration-color: black;
}

.discount {
  color: green;
}
.productImages{
  height: auto;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  /* border: 1px solid #dddddd; */
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #eae5e536;
}

tr td:nth-child(2) {
  text-transform: capitalize;
}

.reviews {
  margin-top: 20px;
}

.review {
  background-color: rgb(245, 245, 245);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.star {
  color: gold;
}

.reviewerName {
  display: inline-flex;
  flex: 1;
}

.profile {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  font-size: 10px;
  font-weight: 500;
  color: white;
}

.reviewerEmail {
  transform: translateY(-10px);
  font-size: small;
  color: rgb(112, 107, 107);
}
ol li{
  background-color: rgb(111, 111, 111) !important;
}

ol li.active{
  background-color: rgb(45, 45, 45) !important;
}
@media (max-width: 584px) {
  .page {
    display: flex;
    flex-direction: column;
  }
}
</style>