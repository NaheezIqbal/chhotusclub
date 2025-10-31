import { Button } from "@/components/ui/button";
import {
  Airplay,
  ChevronLeftIcon,
  ChevronRightIcon,
  Heater,
  Images,
  Shirt,
  ShoppingBasket,
  WashingMachine,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
// import { mockProducts } from "@/mock/products";

const categoriesWithIcon = [
  { id: "girls", label: "Girls Collection", image: "/images/Girls Collection.jpg" },
  { id: "boys", label: "Boys Collection", image: "/images/boy.jpg" },
  { id: "kids", label: "Kids Special", image: "/images/kids special.jpg" },
  { id: "winter", label: "Winter Collection", image: "/images/winter collection2.jpg" },
  { id: "new-arrivals", label: "New Arrivals", image: "/images/new arrival.jpg" },
];

// Mock data for hero banners based on Chhotu's Club design
const mockFeatureImages = [
  {
    _id: "1",
    image: "/images/boy.jpg",
    title: "Kids Collection",
  },
  {
    _id: "2",
    image: "/images/hero-2.jpg",
    title: "Winter Collection",
  },
  {
    _id: "3",
    image: "/images/hero-3.jpg",
    title: "New Arrivals",
  },
];

// Mock products data based on the screenshot
const mockProducts = [
  {
 _id: "1",
    title: "3D Butterfly Yellow Kids Tracksuit Set",
    description: "Comfortable tracksuit for boys",
    image: "/images/3D Butterfly Yellow Kids Sweatshirt & Jogger Set.jpg",
    price: 3800,
    salePrice: 2800,
    category: "kids",
    brand: "chhotu",
    totalStock: 15,
  },
  {
     _id: "2",
    title: "Chhotus Brand Tag Tracksuit Set",
    description: "Stylish casual wear for boys",
    image: "/images/Chhotus Brand Tag Tracksuit Set.jpg",
    price: 3500,
    salePrice: 2800,
    category: "kids",
    brand: "chhotu",
    totalStock: 12,
  
  },
  {
    _id: "3",
    title: "Pop Girl Vibe Set",
    description: "Cozy hoodie with matching joggers",
    image: "/images/Pop Girl Vibe Set.jpg",
    price: 3500,
    salePrice: 2800,
    category: "kids",
    brand: "chhotu",
    totalStock: 6,
  },
  {
    _id: "4",
    title: "Batman Kids Hoodie & Jogger Set – Cozy Superhero Outfit",
    description: "Smart casual outfit for boys",
    image: "/images/Batman Kids Hoodie & Jogger Set – Cozy Superhero Outfit.jpg",
    price: 3800,
    salePrice: 2800,
    category: "kids",
    brand: "chhotu",
    totalStock: 8,
  },
  {
    _id: "5",
    title: "Kids Minnie Mouse Sweatshirt & Jogger Set",
    description: "Comfortable athleisure for girls",
    image: "/images/Kids Minnie Mouse Sweatshirt & Jogger Set.jpg",
    price: 3500,
    salePrice: 1800,
    category: "kids",
    brand: "chhotu",
    totalStock: 18,
  },
  {
    _id: "6",
    title: "Minnie Mouse Pastel Lilac Kids Sweatshirt",
    description: "Adorable pink tracksuit for girls",
    image: "/images/Minnie Mouse Pastel Lilac Kids Sweatshirt.jpg",
    price: 4000,
    salePrice: 3000,
    category: "kids",
    brand: "chhotu",
    totalStock: 14,
  },
  {
    _id: "7",
    title: "Workholic Kids Hoodie suit",
    description: "Warm and stylish winter wear",
    image: "/images/Workholic Kids Hoodie suit.jpg",
    price: 3000,
    salePrice: 1998,
    category: "kids",
    brand: "chhotu",
    totalStock: 10,
  },
  {
    _id: "8",
    title: "Nixxin Tracksuit kids",
    description: "Classic navy tracksuit with prints",
    image: "/images/Nixxin Tracksuit kids.jpg",
    price: 4200,
    salePrice: 3600,
    totalStock: 16,
  },
];

// Review images data
const reviewImages = [
  { id: 1, image: "/images/r1.jpg", alt: "Customer Review 1" },
  { id: 2, image: "/images/r2.jpg", alt: "Customer Review 2" },
  { id: 3, image: "/images/r3.jpg", alt: "Customer Review 3" },
  { id: 4, image: "/images/r4.jpg", alt: "Customer Review 4" },
  { id: 5, image: "/images/r5.jpg", alt: "Customer Review 5" },
  { id: 6, image: "/images/r6.jpg", alt: "Customer Review 6" },
  { id: 7, image: "/images/r7.jpg", alt: "Customer Review 7" },
];

// Review Slider Component
function ReviewSlider() {
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1); // Mobile: 1 slide
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2); // Tablet: 2 slides
      } else {
        setSlidesToShow(3); // Desktop: 3 slides
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewSlide((prev) => {
        const maxSlide = reviewImages.length - slidesToShow;
        return prev >= maxSlide ? 0 : prev + 1;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [slidesToShow]);

  const handleNextSlide = () => {
    setCurrentReviewSlide((prev) => {
      const maxSlide = reviewImages.length - slidesToShow;
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };

  const handlePrevSlide = () => {
    setCurrentReviewSlide((prev) => {
      const maxSlide = reviewImages.length - slidesToShow;
      return prev <= 0 ? maxSlide : prev - 1;
    });
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Slider Container */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${
              currentReviewSlide * (100 / slidesToShow)
            }%)`,
          }}
        >
          {reviewImages.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
                <img
                  src={review.image}
                  alt={review.alt}
                  className="w-full h-64 sm:h-80 md:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevSlide}
        className="absolute top-1/2 -left-4 sm:-left-6 transform -translate-y-1/2 bg-white hover:bg-gray-100 shadow-lg rounded-full w-10 h-10 sm:w-12 sm:h-12 z-10"
      >
        <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleNextSlide}
        className="absolute top-1/2 -right-4 sm:-right-6 transform -translate-y-1/2 bg-white hover:bg-gray-100 shadow-lg rounded-full w-10 h-10 sm:w-12 sm:h-12 z-10"
      >
        <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({
          length: Math.max(1, reviewImages.length - slidesToShow + 1),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentReviewSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentReviewSlide === index
                ? "bg-orange-500 w-6 sm:w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Comment out backend data fetching for now
  // const { productList, productDetails } = useSelector(
  //   (state) => state.shopProducts
  // );
  // const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  // Use mock data instead of backend data
  const productList = mockProducts;
  const featureImageList = mockFeatureImages;
  const productDetails = null; // Will be handled later

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    // Comment out for now - using mock data
    // dispatch(fetchProductDetails(getCurrentProductId));
    console.log("Product details for:", getCurrentProductId);
  }

  function handleAddtoCart(getCurrentProductId) {
    if (!isAuthenticated) {
      toast({
        title: "Please login to add items to cart",
        description: "You need to be logged in to add items to your cart",
        variant: "destructive",
      });
      return;
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

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    // Comment out backend API calls for now - using mock data
    // dispatch(
    //   fetchAllFilteredProducts({
    //     filterParams: {},
    //     sortParams: "price-lowtohigh",
    //   })
    // );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    // Comment out backend API calls for now - using mock data
    // dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-300">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((slide, index) => (
            <img
              src={slide?.image}
              key={index}
              className={`${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              alt={slide?.title || "Banner"}
            />
          ))
        ) : (
          // Fallback hero content when no images
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white z-10 px-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-orange-600">
                CHHOTU&apos;S CLUB
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 lg:mb-8 text-gray-800">
                Explore Amazing Kids Collection
              </p>
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg"
                onClick={() => navigate("/shop/listing")}
              >
                Shop Now
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200/80 to-yellow-200/80"></div>
          </div>
        )}

        {featureImageList && featureImageList.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentSlide(
                  (prevSlide) =>
                    (prevSlide - 1 + featureImageList.length) %
                    featureImageList.length
                )
              }
              className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            >
              <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentSlide(
                  (prevSlide) => (prevSlide + 1) % featureImageList.length
                )
              }
              className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            >
              <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </Button>
          </>
        )}
      </div>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Shop by Collection
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriesWithIcon.map((categoryItem) => (
              <div
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Image Container with Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={categoryItem.image}
                      alt={categoryItem.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg text-center drop-shadow-lg">
                      {categoryItem.label}
                    </h3>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-4 border-transparent group-hover:border-orange-400 rounded-2xl transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3 text-gray-800">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked collection of the best kids clothing
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productList && productList.length > 0
              ? productList
                  .slice(0, 8)
                  .map((productItem) => (
                    <ShoppingProductTile
                      key={productItem?._id}
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  ))
              : null}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3 text-gray-800">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what parents love about Chhotu&apos;s Club
            </p>
          </div>
          <ReviewSlider />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Join Chhotu&apos;s Club Family
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Sign up today to unlock exclusive deals, faster checkout, and
            personalized recommendations for your little ones
          </p>
          <div className="flex gap-4 justify-center">
            <Button
        
              variant="outline"
              size="lg"
              onClick={() => navigate("/auth/login")}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-3"
            >
          
              Sign Up Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/auth/login")}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-3"
            >
              Login
            </Button>
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
