import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, RotateCcw, Upload } from "lucide-react";
import FrameCarousel from "@/components/FrameSelector";
import VoteFramePreview from "@/components/VoteFramePreview";

export default function Home() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedFrame, setSelectedFrame] = useState<"frame1" | "frame2" | "frame3" | "frame4" | "frame5">("frame1");
    const [zoom, setZoom] = useState(100);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target?.result as string);
                setZoom(100);
                setOffsetX(0);
                setOffsetY(0);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!uploadedImage) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDragging || !uploadedImage) return;

        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        // Convert pixel movement to offset percentage (adjust sensitivity)
        const sensitivity = 0.5;
        setOffsetX((prev) => Math.max(-100, Math.min(100, prev + deltaX * sensitivity)));
        setOffsetY((prev) => Math.max(-100, Math.min(100, prev + deltaY * sensitivity)));

        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleCanvasMouseUp = () => {
        setIsDragging(false);
    };

    const handleDownload = async () => {
        if (!canvasRef.current || !uploadedImage) return;

        const canvas = canvasRef.current;
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `bnp-vote-frame-${Date.now()}.png`;
        link.click();
    };

    const handleReset = () => {
        setUploadedImage(null);
        setSelectedFrame("frame1");
        setZoom(100);
        setOffsetX(0);
        setOffsetY(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Unique Hero Section - Split Design */}
            <div className="relative overflow-hidden">
                {/* Red Section */}
                <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-r from-[#E41E3F] to-[#C41830] clip-path-diagonal" style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)"
                }}>
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: "radial-gradient(circle at 20% 50%, white, transparent 50%)"
                    }}></div>
                </div>

                {/* Green Section */}
                <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-r from-[#007A5E] to-[#005A47] clip-path-diagonal" style={{
                    clipPath: "polygon(0 70%, 100% 0, 100% 100%, 0 100%)"
                }}>
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: "radial-gradient(circle at 80% 50%, white, transparent 50%)"
                    }}></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 pt-12 pb-20 px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-[#FFD700]">
                            <img src="/images/bnp-logo.jpg" alt="BNP Logo" className="w-16 h-16 rounded-full object-cover" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bengali-text text-white mb-2 drop-shadow-lg">
                        সবার আগে বাংলাদেশ
                    </h1>
                    <p className="text-xl md:text-2xl text-white/95 bengali-text drop-shadow-md">
                        ধানের শীষে ভোট দিন
                    </p>
                </div>
            </div>

            {/* Main Content - Asymmetric Layout */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left Panel - Controls (Red Accent) */}
                    <div className="lg:col-span-2">
                        <Card className="shadow-2xl border-0 overflow-hidden">
                            {/* Header with red accent */}
                            <div className="bg-gradient-to-r from-[#E41E3F] to-[#C41830] p-6 text-white">
                                <h2 className="text-2xl font-bold bengali-text">আপনার ছবি আপলোড করুন</h2>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {!uploadedImage ? (
                                    <div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        <Button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full bg-[#E41E3F] hover:bg-[#C41830] text-white py-8 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
                                        >
                                            <Upload className="mr-3 h-5 w-5" />
                                            ছবি নির্বাচন করুন
                                        </Button>
                                        <p className="text-center text-gray-500 mt-6 bengali-text text-sm">
                                            আপনার ছবি এখানে আপলোড করে শুরু করুন
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-5">
                                        {/* Frame Selection */}
                                        <div>
                                            <h3 className="text-lg font-bold text-[#E41E3F] mb-3 bengali-text">ফ্রেম নির্বাচন করুন</h3>
                                            <FrameCarousel
                                                selectedFrame={selectedFrame}
                                                onSelectFrame={setSelectedFrame}
                                            />
                                        </div>

                                        {/* Zoom Control */}
                                        <div className="pt-4 border-t border-gray-200">
                                            <label className="block text-sm font-bold text-gray-700 mb-3 bengali-text">
                                                জুম স্তর: {zoom}%
                                            </label>
                                            <input
                                                type="range"
                                                min="50"
                                                max="200"
                                                value={zoom}
                                                onChange={(e) => setZoom(Number(e.target.value))}
                                                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E41E3F]"
                                            />
                                        </div>

                                        {/* Position Controls */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-bold text-gray-600 bengali-text block mb-2">X অবস্থান</label>
                                                <input
                                                    type="range"
                                                    min="-100"
                                                    max="100"
                                                    value={offsetX}
                                                    onChange={(e) => setOffsetX(Number(e.target.value))}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#007A5E]"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-600 bengali-text block mb-2">Y অবস্থান</label>
                                                <input
                                                    type="range"
                                                    min="-100"
                                                    max="100"
                                                    value={offsetY}
                                                    onChange={(e) => setOffsetY(Number(e.target.value))}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#007A5E]"
                                                />
                                            </div>
                                        </div>

                                        {/* Drag Info */}
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                            <p className="text-xs text-blue-700 bengali-text font-semibold">
                                                💡 টিপ: প্রিভিউতে ছবি ড্র্যাগ করে সরান
                                            </p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 pt-4">
                                            <Button
                                                onClick={handleDownload}
                                                className="flex-1 bg-[#E41E3F] hover:bg-[#C41830] text-white py-3 font-bold rounded-lg transition-all duration-200 hover:shadow-lg"
                                            >
                                                <Download className="mr-2 h-4 w-4" />
                                                ডাউনলোড
                                            </Button>
                                            <Button
                                                onClick={handleReset}
                                                variant="outline"
                                                className="flex-1 border-2 border-[#007A5E] text-[#007A5E] hover:bg-[#007A5E]/5 py-3 font-bold rounded-lg transition-all duration-200"
                                            >
                                                <RotateCcw className="mr-2 h-4 w-4" />
                                                নতুন
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Right Panel - Preview (Green Accent) */}
                    <div className="lg:col-span-3">
                        <Card className="shadow-2xl border-0 overflow-hidden sticky top-4">
                            {/* Header with green accent */}
                            <div className="w-full bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#FFA500] py-8 px-4 text-center text-white shadow-lg">
                                <div className="container mx-auto">
                                    <div className="flex justify-center mb-4">
                                        <img src="/images/bnp-logo.jpg" alt="BNP Logo" className="h-16 w-16 rounded-full shadow-md" />
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-bold bengali-text mb-2">

                                        সবার আগে বাংলাদেশ

                                    </h1>
                                    <p className="text-lg md:text-xl text-white/90 bengali-text">
                                        ধানের শীষে ভোট দিন
                                    </p>
                                </div>
                            </div>

                            {/* Preview Content */}
                            <div className="bg-gradient-to-br from-gray-50 to-white p-8">
                                <div
                                    className={uploadedImage ? "cursor-move" : ""}
                                    onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                                        if (!uploadedImage) return;
                                        setIsDragging(true);
                                        setDragStart({ x: e.clientX, y: e.clientY });
                                    }}
                                    onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
                                        if (!isDragging || !uploadedImage) return;
                                        const deltaX = e.clientX - dragStart.x;
                                        const deltaY = e.clientY - dragStart.y;
                                        const sensitivity = 0.5;
                                        setOffsetX((prev) => Math.max(-100, Math.min(100, prev + deltaX * sensitivity)));
                                        setOffsetY((prev) => Math.max(-100, Math.min(100, prev + deltaY * sensitivity)));
                                        setDragStart({ x: e.clientX, y: e.clientY });
                                    }}
                                    onMouseUp={() => setIsDragging(false)}
                                    onMouseLeave={() => setIsDragging(false)}
                                >
                                    <VoteFramePreview
                                        uploadedImage={uploadedImage}
                                        selectedFrame={selectedFrame}
                                        zoom={zoom}
                                        offsetX={offsetX}
                                        offsetY={offsetY}
                                        canvasRef={canvasRef}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>


            {/* Footer */}
            <div className="mt-16 bg-gradient-to-r from-[#E41E3F] to-[#007A5E] text-white py-8 px-4">
                <div className="container mx-auto text-center">
                    <p className="bengali-text font-semibold mb-2">
                        বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি)
                    </p>
                    <p className="text-sm text-white/80">
                        © ২০২৬ সকল অধিকার সংরক্ষিত | সবার আগে বাংলাদেশ
                    </p>
                </div>
            </div>
        </div>
    );
}
