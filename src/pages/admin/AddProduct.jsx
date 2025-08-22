import React from "react";
import { useProductForm } from "../../components/admin/addProduct/useProductForm";
import ProductInfoCard from "../../components/admin/addProduct/ProductInfoCard";
import MediaUploader from "../../components/admin/addProduct/MediaUploader";
import CategoriesTagsCard from "../../components/admin/addProduct/CategoriesTagsCard";
import StatusVisibilityCard from "../../components/admin/addProduct/StatusVisibilityCard";
import PricingInventoryCard from "../../components/admin/addProduct/PricingInventoryCard";
import SeoCard from "../../components/admin/addProduct/SeoCard";
import StickyActions from "../../components/admin/addProduct/StickyActions";
import { cls } from "../../components/admin/addProduct/cls";

export default function AddProduct() {
    const state = useProductForm();

    return (
        <div className="p-3">
            {/* Header */}
            <div className="flex items-center justify-end mb-2">

                <div className="flex gap-2">
                    <button className={`${cls.btn} ${cls.btnGhost}`}>Save Draft</button>
                    <button className={`${cls.btn} ${cls.btnPrimary}`}>Publish</button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 4xl:grid-cols-12 gap-2">
                {/* Main */}
                <div className="4xl:col-span-8 space-y-2">
                    <ProductInfoCard
                        name={state.name} setName={state.setName}
                        slug={state.slug}
                        description={state.description} setDescription={state.setDescription}
                    />
                    <MediaUploader
                        dropRef={state.dropRef} onDrop={state.onDrop} onPick={state.onPick}
                        files={state.files} removeFile={state.removeFile}
                    />
                    <CategoriesTagsCard
                        categories={state.categories}
                        categoryInput={state.categoryInput}
                        setCategoryInput={state.setCategoryInput}
                        addCategory={state.addCategory}
                        removeCategory={state.removeCategory}
                        tags={state.tags}
                        tagsInput={state.tagsInput}
                        setTagsInput={state.setTagsInput}
                        onTagsBlur={state.onTagsBlur}
                        removeTag={state.removeTag}
                    />
                </div>

                {/* Sidebar */}
                <div className="4xl:col-span-4 space-y-2">
                    <StatusVisibilityCard
                        status={state.status} setStatus={state.setStatus}
                        visibility={state.visibility} setVisibility={state.setVisibility}
                        scheduleAt={state.scheduleAt} setScheduleAt={state.setScheduleAt}
                    />
                    <PricingInventoryCard
                        price={state.price} setPrice={state.setPrice}
                        compareAt={state.compareAt} setCompareAt={state.setCompareAt}
                        discountPct={state.discountPct} setDiscountPct={state.setDiscountPct}
                        finalPrice={state.finalPrice}
                        stock={state.stock} stepStock={state.stepStock} setStockSafe={state.setStockSafe}
                    />
                    <SeoCard
                        metaTitle={state.metaTitle} setMetaTitle={state.setMetaTitle}
                        metaDescription={state.metaDescription} setMetaDescription={state.setMetaDescription}
                    />
                </div>
            </div>

            <StickyActions
                onReset={state.onReset}
                onSaveDraft={state.onSaveDraft}
                onPublish={state.onPublish}
            />
        </div>
    );
}
