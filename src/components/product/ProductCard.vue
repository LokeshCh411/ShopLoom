<template>
  <div class="card" @click="onSelectingProduct(this.product.id)">
    <img
      v-if="product.images && product.images[0]"
      :src="product.images[0]"
      class="card-img-top"
      alt="Product Image"
    />
    <img
      v-else
      src="https://images.unsplash.com/photo-1616499370260-485b3e5ed653?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      class="card-img-top"
      alt="Random Image"
    />
    <div class="card-body">
      <p>{{ product.title }}</p>
      <!-- <p>{{ "Rs."+parseInt(product.price) }} <span>
        <small class="discount"> {{ "-" + product.discountPercentage }}%</small></span></p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      Required: true,
    }
  }, 
  methods:{
    onSelectingProduct(id){
      this.$router.push({ name: 'product', params: { id } });
    }
  }
};
</script>

<style scoped>
.card{
  background-color: rgb(243, 243, 243);
  height: 250px;
  width: 100%;
  display: flex;
  flex-direction: column; /* Ensures image and text are stacked */
  justify-content: space-between; /* Pushes content apart */
}
.card img{
 height: 200px;
  width: 100%;
  object-fit: contain;
  padding: 5px;
}
.card-body {
  text-align: center; 
  padding: 0;
  margin: 0; 
  font-size: small;
}
</style>