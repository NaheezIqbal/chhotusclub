import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const navigate = useNavigate();

  return (
    <div className="group relative w-full max-w-sm mx-auto h-full">
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl bg-white h-full flex flex-col">
        <div
          onClick={() => navigate(`/shop/product/${product?._id}`)}
          className="cursor-pointer flex-1 flex flex-col"
        >
          {/* Image Container */}
          <div className="relative overflow-hidden flex-shrink-0">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Badges */}
            {product?.totalStock === 0 ? (
              <Badge className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-sm font-semibold shadow-lg">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="absolute top-3 right-3 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 text-sm font-semibold shadow-lg">
                {`Only ${product?.totalStock} left`}
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-3 py-1.5 text-sm font-semibold shadow-lg">
                Sale
              </Badge>
            ) : null}

            {/* Discount Percentage Badge */}
            {product?.salePrice > 0 && (
              <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-sm font-bold shadow-lg">
                {Math.round(
                  ((product?.price - product?.salePrice) / product?.price) * 100
                )}
                % OFF
              </Badge>
            )}
          </div>

          {/* Content */}
          <CardContent className="p-5 flex-1 flex flex-col">
            <h2 className="text-lg font-bold mb-3 text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300 min-h-[3.5rem]">
              {product?.title}
            </h2>

            {/* Category and Brand */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                {categoryOptionsMap[product?.category]}
              </span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-medium">
                {brandOptionsMap[product?.brand]}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-auto">
              {product?.salePrice > 0 ? (
                <>
                  <span className="text-2xl font-bold text-orange-600">
                    ${product?.salePrice}
                  </span>
                  <span className="text-lg text-gray-400 line-through font-medium">
                    ${product?.price}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-800">
                  ${product?.price}
                </span>
              )}
            </div>
          </CardContent>
        </div>

        {/* Footer Button */}
        <CardFooter className="p-5 pt-0 flex-shrink-0">
          {product?.totalStock === 0 ? (
            <Button
              disabled
              className="w-full bg-gray-300 text-gray-500 cursor-not-allowed py-6 text-base font-semibold rounded-xl"
            >
              Out Of Stock
            </Button>
          ) : (
            <Button
              onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
              className="w-full bg-black hover:bg-gray-800 text-white py-6 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Add to Cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default ShoppingProductTile;
