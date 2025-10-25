import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

// Mock products data based on Chhotu's Club theme
const mockProducts = [
  {
    _id: "1",
    title: "Cute Bear Kids Tracksuit",
    description: "Comfortable tracksuit for boys",
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400",
    price: 45,
    salePrice: 35,
    category: "boys",
    brand: "chhotu",
    totalStock: 15,
  },
  {
    _id: "2",
    title: "Graphic Sweatshirt and Jeans Set",
    description: "Stylish casual wear for boys",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400",
    price: 52,
    salePrice: 42,
    category: "boys",
    brand: "chhotu",
    totalStock: 12,
  },
  {
    _id: "3",
    title: "Always Be Humble & Kind Hoodie Set",
    description: "Cozy hoodie with matching joggers",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
    price: 48,
    salePrice: 38,
    category: "kids",
    brand: "chhotu",
    totalStock: 20,
  },
  {
    _id: "4",
    title: "Charcoal Club Polo & Jeans Set",
    description: "Smart casual outfit for boys",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    price: 55,
    salePrice: 45,
    category: "boys",
    brand: "chhotu",
    totalStock: 8,
  },
  {
    _id: "5",
    title: "Girls Pink Sweatshirt & Joggers",
    description: "Comfortable athleisure for girls",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400",
    price: 42,
    salePrice: 32,
    category: "girls",
    brand: "chhotu",
    totalStock: 18,
  },
  {
    _id: "6",
    title: "Cute Pink Tracksuit",
    description: "Adorable pink tracksuit for girls",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400",
    price: 40,
    salePrice: 30,
    category: "girls",
    brand: "chhotu",
    totalStock: 14,
  },
  {
    _id: "7",
    title: "Winter Hoodie with Graphics",
    description: "Warm and stylish winter wear",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
    price: 50,
    salePrice: 40,
    category: "winter",
    brand: "chhotu",
    totalStock: 10,
  },
  {
    _id: "8",
    title: "Navy Printed Tracksuit",
    description: "Classic navy tracksuit with prints",
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400",
    price: 46,
    salePrice: 36,
    category: "kids",
    brand: "chhotu",
    totalStock: 16,
  },
  {
    _id: "9",
    title: "Little Princess Dress Set",
    description: "Beautiful dress for special occasions",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400",
    price: 60,
    salePrice: 50,
    category: "girls",
    brand: "premium",
    totalStock: 12,
  },
  {
    _id: "10",
    title: "Boys Summer Shorts Set",
    description: "Cool and comfortable summer wear",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400",
    price: 38,
    salePrice: 28,
    category: "boys",
    brand: "comfort",
    totalStock: 22,
  },
];

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  // Comment out backend data fetching for now
  // const { productList, productDetails } = useSelector(
  //   (state) => state.shopProducts
  // );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();

  // Use mock data instead of backend data
  const productList = mockProducts;
  const productDetails = null; // Will be handled later

  const categorySearchParam = searchParams.get("category");

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    if (!isAuthenticated) {
      toast({
        title: "Please login to add items to cart",
        description: "You need to be logged in to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    console.log(cartItems);
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

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    // Comment out backend API calls for now - using mock data
    // if (filters !== null && sort !== null)
    //   dispatch(
    //     fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
    //   );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    // Comment out backend API calls for now
    // if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  console.log(productList, "productListproductListproductList");

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-4 md:p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-white w-full rounded-2xl shadow-lg">
        <div className="p-6 border-b bg-gradient-to-r from-orange-50 to-pink-50 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-semibold bg-white px-4 py-2 rounded-full shadow-sm">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-white hover:bg-orange-50 border-2 hover:border-orange-300 font-semibold"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing;
