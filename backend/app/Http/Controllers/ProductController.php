<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Product::all();

        return response()->json([
            "products" => $product
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        try{
            $imageName = Str::random(20).'.'.$request->image->getClientOriginalExtension();
            Product::create([
                'name' => $request->name,
                'image'=>$imageName,
                "description"=>$request->description,
            ]);

            //Save image in storage folder
            Storage::disk('public')->put($imageName,file_get_contents($request->image));

            return response()->json([
                "message" => 'Product successfully created.'
            ]);

        }catch(\Exception $e){
            return response()->json([
                'message'=>'Something went wrong.'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::find($id);
        if(!$product){
            return response()->json([
                "message"=>"Product not found."
            ],404);
        }

        return response()->json([
            'product'=>$product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, $id)
    {    
        try{
            $product = Product::find($id);
            if(!$product){
                return response()->json([
                    "message"=>"Product not found."
                ],404);
            }
            
            //add to database
            $product->name = $request->name;
            $product->description = $request->description;
            if($request->image){
                $storage = Storage::disk('public');
                $imageName = Str::random(20).'.'.$request->image->getClientOriginalExtension();

                //old image delete 
                if($storage->exists($product->image)){
                    $storage->delete($product->image);
                }

                $product->image = $imageName;
                $storage->put($imageName,file_get_contents($request->image));
            }

            $product->update();
            
            return response()->json([
                "message"=>"Product successfully updated."
            ]);
        }catch(\Exception $e){
            return response()->json([
                "message"=>"Something went wrong"
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product= Product::find($id);
        if(!$product){
            return response()->json([
                "message"=>"Product not found."
            ],404);
        }
        //Public storage
        $storage = Storage::disk('public');

        //Image exists or not, if exists delete
        if($storage->exists($product->image)){
            $storage->delete($product->image);
        }

        //product delete
        $product->delete();

        //Response
        return response()->json([
            'message'=>"Product successfully deleted."
        ],200);
    }
}
