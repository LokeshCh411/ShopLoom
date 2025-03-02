<template>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <router-link :to="{ name: 'category', params: { categoryName: 'all' } }" class="category-link">
                    <img src="https://static.vecteezy.com/system/resources/previews/002/006/774/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg"
                        class="d-block w-100" alt="...">
                </router-link>
            </div>
            <div class="carousel-item">
                <router-link :to="{ name: 'category', params: { categoryName: 'women' } }" class="category-link">
                    <img src="https://sslimages.shoppersstop.com/sys-master/root/h15/h0d/12268840419358/banner_00_2000x600_TRADITIONALWEAR_EN_2000W_20190131.jpg"
                        class="d-block w-100" alt="..." />
                </router-link>
            </div>
            <div class="carousel-item">
                <router-link :to="{ name: 'category', params: { categoryName: 'smartphones' } }" class="category-link">
                    <img src="https://cdn.grabon.in/gograbon/images/web-images/uploads/1593768343013/mobile-offers.jpg"
                        class="d-block w-100" alt="...">
                </router-link>
            </div>
            <div class="carousel-item">
                <router-link :to="{ name: 'category', params: { categoryName: 'all' } }" class="category-link">
                    <img src="https://static.vecteezy.com/system/resources/previews/011/871/820/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
                        class="d-block w-100" alt="...">
                </router-link>
            </div>

            <div class="carousel-item">
                <router-link :to="{ name: 'category', params: { categoryName: 'laptops' } }" class="category-link">
                    <img src="https://i.pinimg.com/originals/bc/47/de/bc47deec54383aa62b31e041f71327c7.jpg"
                        class="d-block w-100" alt="...">
                </router-link>
            </div>
            <div class="carousel-item">
                <router-link :to="{ name: 'category', params: { categoryName: 'groceries' } }" class="category-link">
                    <img src="https://1.bp.blogspot.com/-MvuK-VcItio/Xhgv-8BrPrI/AAAAAAAAAM8/Xk5YM7xBQKoKmT-5-CA_hlYMXk0lM-h2QCLcBGAsYHQ/s1600/grocery%2Bimg.jpg"
                        class="d-block w-100" alt="...">
                </router-link>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    <div>
        <div class="productCards">
            <div v-for="(product, index) in products" :key="index" class="productCardWrapper">
                <ProductCard :product="product" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ProductCard from '../product/ProductCard.vue';
export default {
    name: "HomePage",
    data() {
        return {
            products: []
        }
    },
    components: {
        ProductCard
    },
    async mounted() {
        await axios
            .get('https://dummyjson.com/product?limit18&skip=5')
            .then((response) => {
                this.products = response.data.products;
            })
            .catch((error) => {
                console.log("Error fetching products:", error);
            });
    }
}
</script>


<style >
img {
    width: 100%;
    height: 300px;
    object-fit: fill;
}

.carousel-control-next-icon {
    color: red !important;
}

@media (max-width: 584px) {
    img {
        height: 200px;
    }

    @media (max-width: 584px) {
        .productCardWrapper {
            width: 45%;
        }
    }
}
</style>