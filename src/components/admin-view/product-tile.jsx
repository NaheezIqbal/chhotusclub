import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <div className="group relative w-full max-w-sm mx-auto h-full">
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl bg-white h-full flex flex-col">
        <div className="relative overflow-hidden flex-shrink-0">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {product?.salePrice > 0 && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 text-sm font-bold shadow-lg rounded-full">
              {Math.round(
                ((product?.price - product?.salePrice) / product?.price) * 100
              )}
              % OFF
            </div>
          )}
        </div>

        <CardContent className="p-5 flex-1 flex flex-col">
          <h2 className="text-lg font-bold mb-3 text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300 min-h-[3.5rem]">
            {product?.title}
          </h2>

          <div className="flex items-center gap-3 mb-2">
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

          <div className="text-sm text-gray-600 mt-auto">
            Stock:{" "}
            <span className="font-semibold">{product?.totalStock} items</span>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3 p-5 pt-0 flex-shrink-0">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
            className="flex-1 bg-black hover:bg-gray-800 text-white py-5 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(product?._id)}
            variant="destructive"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-5 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AdminProductTile;
