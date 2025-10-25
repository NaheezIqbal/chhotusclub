import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "@/mock/products";

function ProductDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  // Use mock data instead of backend
  const [productDetails, setProductDetails] = useState(null);

  const { toast } = useToast();

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    if (!isAuthenticated) {
      toast({
        title: "Please login to add items to cart",
        description: "You need to be logged in to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleOrderOnWhatsApp() {
    const phoneNumber = "923185238498";
    const productName = productDetails?.title || "Product";
    const productPrice =
      productDetails?.salePrice > 0
        ? productDetails?.salePrice
        : productDetails?.price;
    const message = `Hi! I'm interested in ordering:\n\n*${productName}*\nPrice: $${productPrice}\n\nPlease let me know the availability and delivery details.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }

  useEffect(() => {
    if (id) {
      // Use mock data instead of fetching from backend
      const product = getProductById(id);
      setProductDetails(product);
    }
  }, [id]);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!productDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-3">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover:bg-gray-100 text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shopping
        </Button>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          {/* Left Side - Product Image */}
          <div className="relative">
            <div className="sticky top-6">
              <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-md">
                <img
                  src={productDetails?.image}
                  alt={productDetails?.title}
                  className="aspect-square w-full object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Badges */}
                {productDetails?.salePrice > 0 && (
                  <Badge className="absolute top-3 right-3 bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 text-sm font-bold shadow-md">
                    {Math.round(
                      ((productDetails?.price - productDetails?.salePrice) /
                        productDetails?.price) *
                        100
                    )}
                    % OFF
                  </Badge>
                )}

                {productDetails?.totalStock < 10 &&
                  productDetails?.totalStock > 0 && (
                    <Badge className="absolute top-3 left-3 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 text-sm font-semibold shadow-md">
                      Only {productDetails?.totalStock} left!
                    </Badge>
                  )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-gray-200 hover:border-rose-300 hover:bg-rose-50 rounded-lg transition-all duration-300">
                  <Heart className="w-4 h-4" />
                  <span className="font-medium text-sm">Wishlist</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg transition-all duration-300">
                  <Share2 className="w-4 h-4" />
                  <span className="font-medium text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="flex flex-col">
            {/* Product Title & Description */}
            <div className="mb-5">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 leading-tight">
                {productDetails?.title}
              </h1>
              <p className="text-base text-gray-600 leading-relaxed">
                {productDetails?.description}
              </p>
            </div>

            {/* Price */}
            <div className="mb-5 p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex items-baseline gap-3 flex-wrap">
                {productDetails?.salePrice > 0 ? (
                  <>
                    <span className="text-4xl font-bold text-orange-600">
                      ${productDetails?.salePrice}
                    </span>
                    <span className="text-2xl text-gray-400 line-through font-medium">
                      ${productDetails?.price}
                    </span>
                    <span className="text-sm font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                      Save ${productDetails?.price - productDetails?.salePrice}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-gray-800">
                    ${productDetails?.price}
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mb-5 flex gap-3">
              {productDetails?.totalStock === 0 ? (
                <Button
                  disabled
                  className="flex-1 py-5 text-base font-semibold rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
                >
                  Out of Stock
                </Button>
              ) : (
                <>
                  <Button
                    className="flex-1 py-5 text-base font-semibold rounded-lg bg-gray-900 hover:bg-gray-800 text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() =>
                      handleAddToCart(
                        productDetails?._id,
                        productDetails?.totalStock
                      )
                    }
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </Button>
                  <Button
                    className="flex-1 py-5 text-base font-semibold rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={handleOrderOnWhatsApp}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Order on WhatsApp
                  </Button>
                </>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                <Truck className="w-6 h-6 text-blue-600 mb-1.5" />
                <span className="text-xs font-medium text-center text-gray-700">
                  Free Shipping
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg border border-green-100">
                <Shield className="w-6 h-6 text-green-600 mb-1.5" />
                <span className="text-xs font-medium text-center text-gray-700">
                  Secure Payment
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                <RotateCcw className="w-6 h-6 text-purple-600 mb-1.5" />
                <span className="text-xs font-medium text-center text-gray-700">
                  Easy Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
