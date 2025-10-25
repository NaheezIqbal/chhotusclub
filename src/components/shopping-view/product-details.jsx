import {
  StarIcon,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { Badge } from "../ui/badge";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }

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

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  console.log(reviews, "reviews");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:p-8 max-w-[95vw] sm:max-w-[90vw] lg:max-w-[1200px] max-h-[90vh] overflow-y-auto">
        {/* Left Side - Product Image */}
        <div className="relative">
          <div className="sticky top-0">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl">
              <img
                src={productDetails?.image}
                alt={productDetails?.title}
                className="aspect-square w-full object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Badges */}
              {productDetails?.salePrice > 0 && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 text-base font-bold shadow-lg">
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
                  <Badge className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 text-base font-semibold shadow-lg">
                    Only {productDetails?.totalStock} left!
                  </Badge>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 hover:border-pink-500 rounded-xl transition-all duration-300 transform hover:scale-105">
                <Heart className="w-5 h-5" />
                <span className="font-semibold">Wishlist</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 hover:border-blue-500 rounded-xl transition-all duration-300 transform hover:scale-105">
                <Share2 className="w-5 h-5" />
                <span className="font-semibold">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="flex flex-col">
          {/* Product Title & Description */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
              {productDetails?.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {productDetails?.description}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-50 to-yellow-50 px-4 py-2 rounded-full">
              <StarRatingComponent rating={averageReview} />
              <span className="font-bold text-gray-800 ml-2">
                {averageReview.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-500">
              ({reviews?.length || 0}{" "}
              {reviews?.length === 1 ? "review" : "reviews"})
            </span>
          </div>

          {/* Price */}
          <div className="mb-6 p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl border-2 border-orange-200">
            <div className="flex items-baseline gap-4">
              {productDetails?.salePrice > 0 ? (
                <>
                  <span className="text-5xl font-bold text-orange-600">
                    ${productDetails?.salePrice}
                  </span>
                  <span className="text-3xl text-gray-400 line-through font-medium">
                    ${productDetails?.price}
                  </span>
                  <span className="text-xl font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    Save ${productDetails?.price - productDetails?.salePrice}
                  </span>
                </>
              ) : (
                <span className="text-5xl font-bold text-gray-900">
                  ${productDetails?.price}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mb-6 flex gap-3">
            {productDetails?.totalStock === 0 ? (
              <Button
                disabled
                className="flex-1 py-7 text-lg font-bold rounded-xl bg-gray-300 text-gray-500 cursor-not-allowed"
              >
                Out of Stock
              </Button>
            ) : (
              <>
                <Button
                  className="flex-1 py-7 text-lg font-bold rounded-xl bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                  }
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </Button>
                <Button
                  className="flex-1 py-7 text-lg font-bold rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                  onClick={() => handleOrderOnWhatsApp()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Order on WhatsApp
                </Button>
              </>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl">
              <Truck className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-xs font-semibold text-center text-gray-700">
                Free Shipping
              </span>
            </div>
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-xs font-semibold text-center text-gray-700">
                Secure Payment
              </span>
            </div>
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-xl">
              <RotateCcw className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-xs font-semibold text-center text-gray-700">
                Easy Returns
              </span>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Reviews Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <StarIcon className="w-6 h-6 text-orange-500 fill-orange-500" />
              Customer Reviews
            </h2>

            <div className="max-h-[300px] overflow-auto mb-6 space-y-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex gap-4">
                      <Avatar className="w-12 h-12 border-2 border-orange-200">
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-400 text-white font-bold">
                          {reviewItem?.userName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-gray-900">
                            {reviewItem?.userName}
                          </h3>
                          <div className="flex items-center gap-1">
                            <StarRatingComponent
                              rating={reviewItem?.reviewValue}
                            />
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {reviewItem.reviewMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <StarIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-lg">
                    No reviews yet. Be the first to review!
                  </p>
                </div>
              )}
            </div>

            {/* Add Review */}
            <div className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl border-2 border-orange-200">
              <Label className="text-lg font-bold mb-3 block">
                Write Your Review
              </Label>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-semibold text-gray-700">
                  Your Rating:
                </span>
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Share your experience with this product..."
                className="mb-4 py-6 text-base rounded-xl border-2 focus:border-orange-400"
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === "" || rating === 0}
                className="w-full py-6 text-base font-bold rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Submit Review
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
