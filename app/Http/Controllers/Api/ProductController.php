<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Http\Requests\ProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request('search', false);
        $perPage = request('per_page',10);
        $sortField = request('sort_field','updated_at');
        $sortDirection = request('sort_direction','desc');
        $allowedSortFields = ['id', 'title', 'price', 'updated_at'];

        if (!in_array($sortField, $allowedSortFields)) {
            $sortField = 'updated_at';
        }
        if (!in_array($sortDirection, ['asc', 'desc'])) {
            $sortDirection = 'desc';
        }
        $query = Product::query();
        $query->orderBy($sortField, $sortDirection);
        if( $search ) {
            $query->where('title','like', "%{$search}%")
                ->orWhere('description','like', "%{$search}%");
        }
        return ProductListResource::collection($query->paginate($perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        return new ProductResource(Product::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->validated());
        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->noContent();
    }
}
