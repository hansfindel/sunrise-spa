<template>
  <div v-if="product">
    <div data-test="product-gallery"
         class="col-md-4 col-md-offset-1 col-sm-6 product-gallery">
      <ProductGallery v-if="images"
                      :productImages="images" />
    </div>
    <div data-test="product-data"
         class="col-sm-6 product-description">
      <div class="row">
        <div class="col-sm-12">
            <h1 data-test="product-name"
                class="text-uppercase pdp-product-title">
              {{ currentProduct.name }}
            </h1>
            <span data-test="product-sku"
                  class="grey-p quickview-sku">
              {{ matchingVariant.sku }}
            </span>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <!-- {{> catalog/product-rating }} -->
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <p class="pdp-product-description view-details more"
             data-text-show="$t('description.show')"
             data-text-hide="$t('description.hide')">
          </p>
        </div>
      </div>

      <div class="row">
        <div v-if="hasPrice"
             class="col-sm-12">
          <p class="product-price">
            <span v-if="!hasDiscount"
                  data-test="product-original-price">
              {{ formatPrice(originalPrice) }}
            </span>
            <span v-else>
              <span data-test="product-old-price"
                    class="discounted-price">
                {{ formatPrice(originalPrice) }}
              </span>
              <span data-test="product-new-price">
                {{ formatPrice(discountedPrice) }}
              </span>
            </span>
          </p>

        </div>
      </div>
      <!-- {{> catalog/add-to-cart}}
      {{> catalog/add-to-wishlist-btn}}
      {{> catalog/reserve-in-store-btn}} -->
      <button data-test="add-to-cart-button"
              class="add-to-bag-btn">
        <img class="bag-thumb"
             src="../assets/img/hand-bag-2-black.png"
             alt="$t('cart.add')">
        {{ $t('cart.add') }}
      </button>
      <div class="row">
        <div class="col-sm-12">
          <!-- {{> catalog/product-availability availability=product.availability}} -->
        </div>
      </div>

      <!-- toggles -->
      <div class="row">
        <div class="col-sm-12">
          <div data-test="panel-group-pdp"
               class="panel-group panel-group-pdp"
               id="accordion-product-info"
               role="tablist"
               aria-multiselectable="true">
            <div class="panel panel-default">
              <div class="panel-heading"
                   role="tab"
                   id="headingProductDetails">
                  <h4 class="panel-title product-accordion-title text-uppercase">
                    <a data-test="product-attributes-accordion"
                       id="pdp-product-details-toggle"
                       class="collapsed pdp-accord-toggle"
                       data-toggle="collapse"
                       data-parent="#accordion-product-info"
                       href="#collapseProductDetails"
                       aria-expanded="false"
                       aria-controls="collapseProductDetails"
                       @click="openAccordion">
                      {{ $t('details.title') }}
                      <img class="accordion-plus"
                           src="../assets/img/plus79.png"
                           alt="accordion content">
                    </a>
                </h4>
              </div>
              <div id="collapseProductDetails"
                   class="panel-collapse collapse"
                   role="tabpanel"
                   aria-labelledby="headingProductDetails">
                <div class="panel-body panel-body-pdp">
                  <ul v-if="productAttributes"
                      class="product-features-list">
                    <li v-for="attribute in productAttributes"
                        data-test="product-attributes-list"
                        :key="attribute.name">
                      <span v-if="attribute.name"
                            class="attribute-name">
                        {{ attribute.name }}:
                      </span>
                      <span>
                        {{ attribute.label || attribute.value }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="panel panel-default">
              <div class="panel-heading"
                   role="tab"
                   id="headingDelivery">
                <h4 class="panel-title product-accordion-title text-uppercase">
                  <a id="pdp-delivery-returns-toggle"
                     class="collapsed pdp-accord-toggle"
                     data-toggle="collapse"
                     data-parent="#accordion-product-info"
                     href="#collapseDelivery"
                     aria-expanded="false true"
                     aria-controls="collapseDelivery"
                     @click="openAccordion">
                  {{ $t('delivery.title') }}
                    <img class="accordion-plus"
                         src="../assets/img/plus79.png"
                         alt="accordion content" />
                  </a>
                </h4>
              </div>
              <div id="collapseDelivery"
                   class="panel-collapse collapse"
                   role="tabpanel"
                   aria-labelledby="headingDelivery">
                <div class="panel-body panel-body-pdp">
                  <ul class="product-delivery-list">

                    <!-- {{#each deliveryRates.list}}
                    <li>
                      <span>{{name}}:</span> {{price}}{{#if freeAbove}} (FREE for orders above {{freeAbove}}){{/if}}
                      {{#if description}}. {{description}}.{{/if}}
                    </li>
                    {{/each}} -->

                    <li>{{ $t('delivery.freeReturns') }}</li>
                    <li>{{ $t('delivery.moreDeliveryInfo') }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Social media icons-->
      <div class="row">
        <div class="col-sm-12">
          <div class="social-share">
            <ul class="social-icons pdp-social-icons">
              <a href="">
                <li>
                  <img class="social-icon"
                       src="../assets/img/Facebook.png"
                       alt="facebook">
                </li>
              </a>
              <a href="">
                <li>
                  <img class="social-icon"
                       src="../assets/img/Pinterest.png"
                       alt="pinterest">
                </li>
              </a>
              <a href="">
                <li>
                  <img class="social-icon"
                       src="../assets/img/Google.png"
                       alt="google plus">
                </li>
              </a>
            </ul>
            <ul class="social-icons">
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ProductGallery from '@/components/ProductGallery.vue';
import priceMixin from '@/mixins/priceMixin';
import productMixin from '@/mixins/productMixin';

export default {
  components: {
    ProductGallery,
  },

  props: {
    productSlug: String,
    sku: String,
  },

  data: () => ({
    product: null,
  }),

  methods: {
    openAccordion(e) {
      const contextPanelGroup = $('.pdp-accord-toggle').parents('.panel-group-pdp');
      const contextPanel = $(e.target).parents('.panel-default');
      const contextButton = $('.accordion-plus', contextPanel);

      contextButton.toggleClass('accordion-minus');

      // Remove minus class on all other buttons
      contextPanelGroup.find('.accordion-plus').not(contextButton).removeClass('accordion-minus');
    },
  },

  computed: {
    matchingVariant() {
      return this.currentProduct.variant || {};
    },

    images() {
      return this.matchingVariant.images;
    },

    productAttributes() {
      return this.matchingVariant.attributes;
    },
  },

  mixins: [priceMixin, productMixin],

  apollo: {
    product: {
      query: gql`
        query Product($locale: Locale!, $sku: String!, $currency: Currency!) {
          product(sku: $sku) {
            id
            masterData {
              current {
                name(locale: $locale)
                slug(locale: $locale)
                variant(sku: $sku) {
                  sku
                  attributes {
                    ...on mainProductType {
                      designer {
                        label
                        key
                        name
                      }
                      colorFreeDefinition {
                        value(locale: $locale)
                        name
                      }
                      size {
                        value
                        name
                      }
                      style {
                        key
                        label
                        name
                      }
                      gender {
                        key
                        label
                        name
                      }
                      articleNumberManufacturer {
                        name
                        value
                      }
                    }
                  }
                  images {
                    url
                  }
                  price(currency: $currency) {
                    value {
                      ...printPrice
                    }
                    discounted {
                      value {
                       ...printPrice
                      }
                    }
                  }
                }
              }
            }
          }
        }

        fragment printPrice on BaseMoney {
          centAmount
          fractionDigits
        }`,
      variables() {
        return {
          locale: this.$i18n.locale,
          currency: this.currency,
          sku: this.sku,
        };
      },
    },
  },

};
</script>

<!-- eslint-disable -->
<i18n>
{
  "de": {
    "description": {
      "show": "Mehr",
      "hide": "Weniger"
    },
    "details": {
      "title": "Produktdetails"
    },
    "delivery": {
      "title": "Versand & Retoure",
      "freeReturns": "Kostenlose Retoure",
      "moreDeliveryInfo": "Versandinformationen"
    },
    "cart": {
      "add": "In den Warenkorb"
    }
  },
  "en": {
    "description": {
      "show": "Show more",
      "hide": "Show less"
    },
    "details": {
      "title": "Product Details"
    },
    "delivery": {
      "title": "Delivery & Returns",
      "freeReturns": "Free return for all orders.",
      "moreDeliveryInfo": " "
    },
    "cart": {
      "add": "Add to Bag"
    }
  }
}
</i18n>
