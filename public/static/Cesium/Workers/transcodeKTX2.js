define([
  './when-8d13db60',
  './Check-70bec281',
  './RuntimeError-ba10bc3e',
  './WebGLConstants-4c11ee5f',
  './createTaskProcessorWorker',
  './PixelFormat-8e0e5be1',
], function (_, R, A, O, e, t) {
  var T = Object.freeze({
    VK_FORMAT_UNDEFINED: 0,
    VK_FORMAT_R4G4_UNORM_PACK8: 1,
    VK_FORMAT_R4G4B4A4_UNORM_PACK16: 2,
    VK_FORMAT_B4G4R4A4_UNORM_PACK16: 3,
    VK_FORMAT_R5G6B5_UNORM_PACK16: 4,
    VK_FORMAT_B5G6R5_UNORM_PACK16: 5,
    VK_FORMAT_R5G5B5A1_UNORM_PACK16: 6,
    VK_FORMAT_B5G5R5A1_UNORM_PACK16: 7,
    VK_FORMAT_A1R5G5B5_UNORM_PACK16: 8,
    VK_FORMAT_R8_UNORM: 9,
    VK_FORMAT_R8_SNORM: 10,
    VK_FORMAT_R8_USCALED: 11,
    VK_FORMAT_R8_SSCALED: 12,
    VK_FORMAT_R8_UINT: 13,
    VK_FORMAT_R8_SINT: 14,
    VK_FORMAT_R8_SRGB: 15,
    VK_FORMAT_R8G8_UNORM: 16,
    VK_FORMAT_R8G8_SNORM: 17,
    VK_FORMAT_R8G8_USCALED: 18,
    VK_FORMAT_R8G8_SSCALED: 19,
    VK_FORMAT_R8G8_UINT: 20,
    VK_FORMAT_R8G8_SINT: 21,
    VK_FORMAT_R8G8_SRGB: 22,
    VK_FORMAT_R8G8B8_UNORM: 23,
    VK_FORMAT_R8G8B8_SNORM: 24,
    VK_FORMAT_R8G8B8_USCALED: 25,
    VK_FORMAT_R8G8B8_SSCALED: 26,
    VK_FORMAT_R8G8B8_UINT: 27,
    VK_FORMAT_R8G8B8_SINT: 28,
    VK_FORMAT_R8G8B8_SRGB: 29,
    VK_FORMAT_B8G8R8_UNORM: 30,
    VK_FORMAT_B8G8R8_SNORM: 31,
    VK_FORMAT_B8G8R8_USCALED: 32,
    VK_FORMAT_B8G8R8_SSCALED: 33,
    VK_FORMAT_B8G8R8_UINT: 34,
    VK_FORMAT_B8G8R8_SINT: 35,
    VK_FORMAT_B8G8R8_SRGB: 36,
    VK_FORMAT_R8G8B8A8_UNORM: 37,
    VK_FORMAT_R8G8B8A8_SNORM: 38,
    VK_FORMAT_R8G8B8A8_USCALED: 39,
    VK_FORMAT_R8G8B8A8_SSCALED: 40,
    VK_FORMAT_R8G8B8A8_UINT: 41,
    VK_FORMAT_R8G8B8A8_SINT: 42,
    VK_FORMAT_R8G8B8A8_SRGB: 43,
    VK_FORMAT_B8G8R8A8_UNORM: 44,
    VK_FORMAT_B8G8R8A8_SNORM: 45,
    VK_FORMAT_B8G8R8A8_USCALED: 46,
    VK_FORMAT_B8G8R8A8_SSCALED: 47,
    VK_FORMAT_B8G8R8A8_UINT: 48,
    VK_FORMAT_B8G8R8A8_SINT: 49,
    VK_FORMAT_B8G8R8A8_SRGB: 50,
    VK_FORMAT_A8B8G8R8_UNORM_PACK32: 51,
    VK_FORMAT_A8B8G8R8_SNORM_PACK32: 52,
    VK_FORMAT_A8B8G8R8_USCALED_PACK32: 53,
    VK_FORMAT_A8B8G8R8_SSCALED_PACK32: 54,
    VK_FORMAT_A8B8G8R8_UINT_PACK32: 55,
    VK_FORMAT_A8B8G8R8_SINT_PACK32: 56,
    VK_FORMAT_A8B8G8R8_SRGB_PACK32: 57,
    VK_FORMAT_A2R10G10B10_UNORM_PACK32: 58,
    VK_FORMAT_A2R10G10B10_SNORM_PACK32: 59,
    VK_FORMAT_A2R10G10B10_USCALED_PACK32: 60,
    VK_FORMAT_A2R10G10B10_SSCALED_PACK32: 61,
    VK_FORMAT_A2R10G10B10_UINT_PACK32: 62,
    VK_FORMAT_A2R10G10B10_SINT_PACK32: 63,
    VK_FORMAT_A2B10G10R10_UNORM_PACK32: 64,
    VK_FORMAT_A2B10G10R10_SNORM_PACK32: 65,
    VK_FORMAT_A2B10G10R10_USCALED_PACK32: 66,
    VK_FORMAT_A2B10G10R10_SSCALED_PACK32: 67,
    VK_FORMAT_A2B10G10R10_UINT_PACK32: 68,
    VK_FORMAT_A2B10G10R10_SINT_PACK32: 69,
    VK_FORMAT_R16_UNORM: 70,
    VK_FORMAT_R16_SNORM: 71,
    VK_FORMAT_R16_USCALED: 72,
    VK_FORMAT_R16_SSCALED: 73,
    VK_FORMAT_R16_UINT: 74,
    VK_FORMAT_R16_SINT: 75,
    VK_FORMAT_R16_SFLOAT: 76,
    VK_FORMAT_R16G16_UNORM: 77,
    VK_FORMAT_R16G16_SNORM: 78,
    VK_FORMAT_R16G16_USCALED: 79,
    VK_FORMAT_R16G16_SSCALED: 80,
    VK_FORMAT_R16G16_UINT: 81,
    VK_FORMAT_R16G16_SINT: 82,
    VK_FORMAT_R16G16_SFLOAT: 83,
    VK_FORMAT_R16G16B16_UNORM: 84,
    VK_FORMAT_R16G16B16_SNORM: 85,
    VK_FORMAT_R16G16B16_USCALED: 86,
    VK_FORMAT_R16G16B16_SSCALED: 87,
    VK_FORMAT_R16G16B16_UINT: 88,
    VK_FORMAT_R16G16B16_SINT: 89,
    VK_FORMAT_R16G16B16_SFLOAT: 90,
    VK_FORMAT_R16G16B16A16_UNORM: 91,
    VK_FORMAT_R16G16B16A16_SNORM: 92,
    VK_FORMAT_R16G16B16A16_USCALED: 93,
    VK_FORMAT_R16G16B16A16_SSCALED: 94,
    VK_FORMAT_R16G16B16A16_UINT: 95,
    VK_FORMAT_R16G16B16A16_SINT: 96,
    VK_FORMAT_R16G16B16A16_SFLOAT: 97,
    VK_FORMAT_R32_UINT: 98,
    VK_FORMAT_R32_SINT: 99,
    VK_FORMAT_R32_SFLOAT: 100,
    VK_FORMAT_R32G32_UINT: 101,
    VK_FORMAT_R32G32_SINT: 102,
    VK_FORMAT_R32G32_SFLOAT: 103,
    VK_FORMAT_R32G32B32_UINT: 104,
    VK_FORMAT_R32G32B32_SINT: 105,
    VK_FORMAT_R32G32B32_SFLOAT: 106,
    VK_FORMAT_R32G32B32A32_UINT: 107,
    VK_FORMAT_R32G32B32A32_SINT: 108,
    VK_FORMAT_R32G32B32A32_SFLOAT: 109,
    VK_FORMAT_R64_UINT: 110,
    VK_FORMAT_R64_SINT: 111,
    VK_FORMAT_R64_SFLOAT: 112,
    VK_FORMAT_R64G64_UINT: 113,
    VK_FORMAT_R64G64_SINT: 114,
    VK_FORMAT_R64G64_SFLOAT: 115,
    VK_FORMAT_R64G64B64_UINT: 116,
    VK_FORMAT_R64G64B64_SINT: 117,
    VK_FORMAT_R64G64B64_SFLOAT: 118,
    VK_FORMAT_R64G64B64A64_UINT: 119,
    VK_FORMAT_R64G64B64A64_SINT: 120,
    VK_FORMAT_R64G64B64A64_SFLOAT: 121,
    VK_FORMAT_B10G11R11_UFLOAT_PACK32: 122,
    VK_FORMAT_E5B9G9R9_UFLOAT_PACK32: 123,
    VK_FORMAT_D16_UNORM: 124,
    VK_FORMAT_X8_D24_UNORM_PACK32: 125,
    VK_FORMAT_D32_SFLOAT: 126,
    VK_FORMAT_S8_UINT: 127,
    VK_FORMAT_D16_UNORM_S8_UINT: 128,
    VK_FORMAT_D24_UNORM_S8_UINT: 129,
    VK_FORMAT_D32_SFLOAT_S8_UINT: 130,
    VK_FORMAT_BC1_RGB_UNORM_BLOCK: 131,
    VK_FORMAT_BC1_RGB_SRGB_BLOCK: 132,
    VK_FORMAT_BC1_RGBA_UNORM_BLOCK: 133,
    VK_FORMAT_BC1_RGBA_SRGB_BLOCK: 134,
    VK_FORMAT_BC2_UNORM_BLOCK: 135,
    VK_FORMAT_BC2_SRGB_BLOCK: 136,
    VK_FORMAT_BC3_UNORM_BLOCK: 137,
    VK_FORMAT_BC3_SRGB_BLOCK: 138,
    VK_FORMAT_BC4_UNORM_BLOCK: 139,
    VK_FORMAT_BC4_SNORM_BLOCK: 140,
    VK_FORMAT_BC5_UNORM_BLOCK: 141,
    VK_FORMAT_BC5_SNORM_BLOCK: 142,
    VK_FORMAT_BC6H_UFLOAT_BLOCK: 143,
    VK_FORMAT_BC6H_SFLOAT_BLOCK: 144,
    VK_FORMAT_BC7_UNORM_BLOCK: 145,
    VK_FORMAT_BC7_SRGB_BLOCK: 146,
    VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK: 147,
    VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK: 148,
    VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK: 149,
    VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK: 150,
    VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK: 151,
    VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK: 152,
    VK_FORMAT_EAC_R11_UNORM_BLOCK: 153,
    VK_FORMAT_EAC_R11_SNORM_BLOCK: 154,
    VK_FORMAT_EAC_R11G11_UNORM_BLOCK: 155,
    VK_FORMAT_EAC_R11G11_SNORM_BLOCK: 156,
    VK_FORMAT_ASTC_4x4_UNORM_BLOCK: 157,
    VK_FORMAT_ASTC_4x4_SRGB_BLOCK: 158,
    VK_FORMAT_ASTC_5x4_UNORM_BLOCK: 159,
    VK_FORMAT_ASTC_5x4_SRGB_BLOCK: 160,
    VK_FORMAT_ASTC_5x5_UNORM_BLOCK: 161,
    VK_FORMAT_ASTC_5x5_SRGB_BLOCK: 162,
    VK_FORMAT_ASTC_6x5_UNORM_BLOCK: 163,
    VK_FORMAT_ASTC_6x5_SRGB_BLOCK: 164,
    VK_FORMAT_ASTC_6x6_UNORM_BLOCK: 165,
    VK_FORMAT_ASTC_6x6_SRGB_BLOCK: 166,
    VK_FORMAT_ASTC_8x5_UNORM_BLOCK: 167,
    VK_FORMAT_ASTC_8x5_SRGB_BLOCK: 168,
    VK_FORMAT_ASTC_8x6_UNORM_BLOCK: 169,
    VK_FORMAT_ASTC_8x6_SRGB_BLOCK: 170,
    VK_FORMAT_ASTC_8x8_UNORM_BLOCK: 171,
    VK_FORMAT_ASTC_8x8_SRGB_BLOCK: 172,
    VK_FORMAT_ASTC_10x5_UNORM_BLOCK: 173,
    VK_FORMAT_ASTC_10x5_SRGB_BLOCK: 174,
    VK_FORMAT_ASTC_10x6_UNORM_BLOCK: 175,
    VK_FORMAT_ASTC_10x6_SRGB_BLOCK: 176,
    VK_FORMAT_ASTC_10x8_UNORM_BLOCK: 177,
    VK_FORMAT_ASTC_10x8_SRGB_BLOCK: 178,
    VK_FORMAT_ASTC_10x10_UNORM_BLOCK: 179,
    VK_FORMAT_ASTC_10x10_SRGB_BLOCK: 180,
    VK_FORMAT_ASTC_12x10_UNORM_BLOCK: 181,
    VK_FORMAT_ASTC_12x10_SRGB_BLOCK: 182,
    VK_FORMAT_ASTC_12x12_UNORM_BLOCK: 183,
    VK_FORMAT_ASTC_12x12_SRGB_BLOCK: 184,
    VK_FORMAT_G8B8G8R8_422_UNORM: 1000156e3,
    VK_FORMAT_B8G8R8G8_422_UNORM: 1000156001,
    VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM: 1000156002,
    VK_FORMAT_G8_B8R8_2PLANE_420_UNORM: 1000156003,
    VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM: 1000156004,
    VK_FORMAT_G8_B8R8_2PLANE_422_UNORM: 1000156005,
    VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM: 1000156006,
    VK_FORMAT_R10X6_UNORM_PACK16: 1000156007,
    VK_FORMAT_R10X6G10X6_UNORM_2PACK16: 1000156008,
    VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16: 1000156009,
    VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16: 1000156010,
    VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16: 1000156011,
    VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16: 1000156012,
    VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16: 1000156013,
    VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16: 1000156014,
    VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16: 1000156015,
    VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16: 1000156016,
    VK_FORMAT_R12X4_UNORM_PACK16: 1000156017,
    VK_FORMAT_R12X4G12X4_UNORM_2PACK16: 1000156018,
    VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16: 1000156019,
    VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16: 1000156020,
    VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16: 1000156021,
    VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16: 1000156022,
    VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16: 1000156023,
    VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16: 1000156024,
    VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16: 1000156025,
    VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16: 1000156026,
    VK_FORMAT_G16B16G16R16_422_UNORM: 1000156027,
    VK_FORMAT_B16G16R16G16_422_UNORM: 1000156028,
    VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM: 1000156029,
    VK_FORMAT_G16_B16R16_2PLANE_420_UNORM: 1000156030,
    VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM: 1000156031,
    VK_FORMAT_G16_B16R16_2PLANE_422_UNORM: 1000156032,
    VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM: 1000156033,
    VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG: 1000054e3,
    VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG: 1000054001,
    VK_FORMAT_PVRTC2_2BPP_UNORM_BLOCK_IMG: 1000054002,
    VK_FORMAT_PVRTC2_4BPP_UNORM_BLOCK_IMG: 1000054003,
    VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG: 1000054004,
    VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG: 1000054005,
    VK_FORMAT_PVRTC2_2BPP_SRGB_BLOCK_IMG: 1000054006,
    VK_FORMAT_PVRTC2_4BPP_SRGB_BLOCK_IMG: 1000054007,
    VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK_EXT: 1000066e3,
    VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK_EXT: 1000066001,
    VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK_EXT: 1000066002,
    VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK_EXT: 1000066003,
    VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK_EXT: 1000066004,
    VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK_EXT: 1000066005,
    VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK_EXT: 1000066006,
    VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK_EXT: 1000066007,
    VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK_EXT: 1000066008,
    VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK_EXT: 1000066009,
    VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK_EXT: 1000066010,
    VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK_EXT: 1000066011,
    VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK_EXT: 1000066012,
    VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK_EXT: 1000066013,
    VK_FORMAT_G8B8G8R8_422_UNORM_KHR: 1000156e3,
    VK_FORMAT_B8G8R8G8_422_UNORM_KHR: 1000156001,
    VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM_KHR: 1000156002,
    VK_FORMAT_G8_B8R8_2PLANE_420_UNORM_KHR: 1000156003,
    VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM_KHR: 1000156004,
    VK_FORMAT_G8_B8R8_2PLANE_422_UNORM_KHR: 1000156005,
    VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM_KHR: 1000156006,
    VK_FORMAT_R10X6_UNORM_PACK16_KHR: 1000156007,
    VK_FORMAT_R10X6G10X6_UNORM_2PACK16_KHR: 1000156008,
    VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16_KHR: 1000156009,
    VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16_KHR: 1000156010,
    VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16_KHR: 1000156011,
    VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16_KHR: 1000156012,
    VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16_KHR: 1000156013,
    VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16_KHR: 1000156014,
    VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16_KHR: 1000156015,
    VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16_KHR: 1000156016,
    VK_FORMAT_R12X4_UNORM_PACK16_KHR: 1000156017,
    VK_FORMAT_R12X4G12X4_UNORM_2PACK16_KHR: 1000156018,
    VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16_KHR: 1000156019,
    VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16_KHR: 1000156020,
    VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16_KHR: 1000156021,
    VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16_KHR: 1000156022,
    VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16_KHR: 1000156023,
    VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16_KHR: 1000156024,
    VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16_KHR: 1000156025,
    VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16_KHR: 1000156026,
    VK_FORMAT_G16B16G16R16_422_UNORM_KHR: 1000156027,
    VK_FORMAT_B16G16R16G16_422_UNORM_KHR: 1000156028,
    VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM_KHR: 1000156029,
    VK_FORMAT_G16_B16R16_2PLANE_420_UNORM_KHR: 1000156030,
    VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM_KHR: 1000156031,
    VK_FORMAT_G16_B16R16_2PLANE_422_UNORM_KHR: 1000156032,
    VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM_KHR: 1000156033,
  });
  const K = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
  var M, F, B, n, i, C, V, G, r;
  ((r = M || (M = {}))[(r.NONE = 0)] = 'NONE'),
    (r[(r.BASISLZ = 1)] = 'BASISLZ'),
    (r[(r.ZSTD = 2)] = 'ZSTD'),
    (r[(r.ZLIB = 3)] = 'ZLIB'),
    (function (_) {
      _[(_.BASICFORMAT = 0)] = 'BASICFORMAT';
    })(F || (F = {})),
    (function (_) {
      (_[(_.UNSPECIFIED = 0)] = 'UNSPECIFIED'),
        (_[(_.ETC1S = 163)] = 'ETC1S'),
        (_[(_.UASTC = 166)] = 'UASTC');
    })(B || (B = {})),
    (function (_) {
      (_[(_.UNSPECIFIED = 0)] = 'UNSPECIFIED'), (_[(_.SRGB = 1)] = 'SRGB');
    })(n || (n = {})),
    (function (_) {
      (_[(_.UNSPECIFIED = 0)] = 'UNSPECIFIED'),
        (_[(_.LINEAR = 1)] = 'LINEAR'),
        (_[(_.SRGB = 2)] = 'SRGB'),
        (_[(_.ITU = 3)] = 'ITU'),
        (_[(_.NTSC = 4)] = 'NTSC'),
        (_[(_.SLOG = 5)] = 'SLOG'),
        (_[(_.SLOG2 = 6)] = 'SLOG2');
    })(i || (i = {})),
    (function (_) {
      (_[(_.ALPHA_STRAIGHT = 0)] = 'ALPHA_STRAIGHT'),
        (_[(_.ALPHA_PREMULTIPLIED = 1)] = 'ALPHA_PREMULTIPLIED');
    })(C || (C = {})),
    (function (_) {
      (_[(_.RGB = 0)] = 'RGB'),
        (_[(_.RRR = 3)] = 'RRR'),
        (_[(_.GGG = 4)] = 'GGG'),
        (_[(_.AAA = 15)] = 'AAA');
    })(V || (V = {})),
    (function (_) {
      (_[(_.RGB = 0)] = 'RGB'),
        (_[(_.RGBA = 3)] = 'RGBA'),
        (_[(_.RRR = 4)] = 'RRR'),
        (_[(_.RRRG = 5)] = 'RRRG');
    })(G || (G = {}));
  class U {
    constructor() {
      (this.vkFormat = 0),
        (this.typeSize = 1),
        (this.pixelWidth = 0),
        (this.pixelHeight = 0),
        (this.pixelDepth = 0),
        (this.layerCount = 0),
        (this.faceCount = 1),
        (this.supercompressionScheme = M.NONE),
        (this.levels = []),
        (this.dataFormatDescriptor = [
          {
            vendorId: 0,
            descriptorType: F.BASICFORMAT,
            versionNumber: 2,
            descriptorBlockSize: 40,
            colorModel: B.UNSPECIFIED,
            colorPrimaries: n.SRGB,
            transferFunction: n.SRGB,
            flags: C.ALPHA_STRAIGHT,
            texelBlockDimension: { x: 4, y: 4, z: 1, w: 1 },
            bytesPlane: [],
            samples: [],
          },
        ]),
        (this.keyValue = {}),
        (this.globalData = null);
    }
  }
  class N {
    constructor(_, R, A, O) {
      (this._dataView = new DataView(_.buffer, _.byteOffset + R, A)),
        (this._littleEndian = O),
        (this._offset = 0);
    }
    _nextUint8() {
      const _ = this._dataView.getUint8(this._offset);
      return (this._offset += 1), _;
    }
    _nextUint16() {
      const _ = this._dataView.getUint16(this._offset, this._littleEndian);
      return (this._offset += 2), _;
    }
    _nextUint32() {
      const _ = this._dataView.getUint32(this._offset, this._littleEndian);
      return (this._offset += 4), _;
    }
    _nextUint64() {
      const _ =
        this._dataView.getUint32(this._offset, this._littleEndian) +
        2 ** 32 *
          this._dataView.getUint32(this._offset + 4, this._littleEndian);
      return (this._offset += 8), _;
    }
    _skip(_) {
      return (this._offset += _), this;
    }
    _scan(_, R = 0) {
      const A = this._offset;
      let O = 0;
      for (; this._dataView.getUint8(this._offset) !== R && O < _; )
        O++, this._offset++;
      return (
        O < _ && this._offset++,
        new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + A, O)
      );
    }
  }
  function S(_) {
    return 'undefined' != typeof TextDecoder
      ? new TextDecoder().decode(_)
      : Buffer.from(_).toString('utf8');
  }
  var o,
    a = [
      'positiveX',
      'negativeX',
      'positiveY',
      'negativeY',
      'positiveZ',
      'negativeZ',
    ];
  function s(O, e) {
    R.Check.typeOf.object('transcoderModule', o);
    var M,
      F = O.ktx2Buffer,
      B = O.supportedTargetFormats;
    try {
      M = (function (_) {
        const R = new Uint8Array(_.buffer, _.byteOffset, K.length);
        if (
          R[0] !== K[0] ||
          R[1] !== K[1] ||
          R[2] !== K[2] ||
          R[3] !== K[3] ||
          R[4] !== K[4] ||
          R[5] !== K[5] ||
          R[6] !== K[6] ||
          R[7] !== K[7] ||
          R[8] !== K[8] ||
          R[9] !== K[9] ||
          R[10] !== K[10] ||
          R[11] !== K[11]
        )
          throw new Error('Missing KTX 2.0 identifier.');
        const A = new U(),
          O = 17 * Uint32Array.BYTES_PER_ELEMENT,
          e = new N(_, K.length, O, !0);
        (A.vkFormat = e._nextUint32()),
          (A.typeSize = e._nextUint32()),
          (A.pixelWidth = e._nextUint32()),
          (A.pixelHeight = e._nextUint32()),
          (A.pixelDepth = e._nextUint32()),
          (A.layerCount = e._nextUint32()),
          (A.faceCount = e._nextUint32());
        const t = e._nextUint32();
        A.supercompressionScheme = e._nextUint32();
        const T = e._nextUint32(),
          M = e._nextUint32(),
          F = e._nextUint32(),
          B = e._nextUint32(),
          n = e._nextUint64(),
          i = e._nextUint64(),
          C = new N(_, K.length + O, 3 * t * 8, !0);
        for (let R = 0; R < t; R++)
          A.levels.push({
            levelData: new Uint8Array(
              _.buffer,
              _.byteOffset + C._nextUint64(),
              C._nextUint64(),
            ),
            uncompressedByteLength: C._nextUint64(),
          });
        const V = new N(_, T, M, !0),
          G = {
            vendorId: V._skip(4)._nextUint16(),
            descriptorType: V._nextUint16(),
            versionNumber: V._nextUint16(),
            descriptorBlockSize: V._nextUint16(),
            colorModel: V._nextUint8(),
            colorPrimaries: V._nextUint8(),
            transferFunction: V._nextUint8(),
            flags: V._nextUint8(),
            texelBlockDimension: {
              x: V._nextUint8() + 1,
              y: V._nextUint8() + 1,
              z: V._nextUint8() + 1,
              w: V._nextUint8() + 1,
            },
            bytesPlane: [
              V._nextUint8(),
              V._nextUint8(),
              V._nextUint8(),
              V._nextUint8(),
              V._nextUint8(),
              V._nextUint8(),
              V._nextUint8(),
              V._nextUint8(),
            ],
            samples: [],
          },
          r = (G.descriptorBlockSize / 4 - 6) / 4;
        for (let _ = 0; _ < r; _++)
          G.samples[_] = {
            bitOffset: V._nextUint16(),
            bitLength: V._nextUint8(),
            channelID: V._nextUint8(),
            samplePosition: [
              V._nextUint8(),
              V._nextUint8(),
              V._nextUint8(),
              V._nextUint8(),
            ],
            sampleLower: V._nextUint32(),
            sampleUpper: V._nextUint32(),
          };
        (A.dataFormatDescriptor.length = 0), A.dataFormatDescriptor.push(G);
        const o = new N(_, F, B, !0);
        for (; o._offset < B; ) {
          const _ = o._nextUint32(),
            R = o._scan(_),
            O = S(R),
            e = o._scan(_ - R.byteLength);
          (A.keyValue[O] = O.match(/^ktx/i) ? S(e) : e),
            o._offset % 4 && o._skip(4 - (o._offset % 4));
        }
        if (i <= 0) return A;
        const a = new N(_, n, i, !0),
          s = a._nextUint16(),
          L = a._nextUint16(),
          P = a._nextUint32(),
          f = a._nextUint32(),
          l = a._nextUint32(),
          x = a._nextUint32(),
          E = [];
        for (let _ = 0; _ < t; _++)
          E.push({
            imageFlags: a._nextUint32(),
            rgbSliceByteOffset: a._nextUint32(),
            rgbSliceByteLength: a._nextUint32(),
            alphaSliceByteOffset: a._nextUint32(),
            alphaSliceByteLength: a._nextUint32(),
          });
        const X = n + a._offset,
          c = X + P,
          h = c + f,
          I = h + l,
          u = new Uint8Array(_.buffer, _.byteOffset + X, P),
          d = new Uint8Array(_.buffer, _.byteOffset + c, f),
          m = new Uint8Array(_.buffer, _.byteOffset + h, l),
          D = new Uint8Array(_.buffer, _.byteOffset + I, x);
        return (
          (A.globalData = {
            endpointCount: s,
            selectorCount: L,
            imageDescs: E,
            endpointsData: u,
            selectorsData: d,
            tablesData: m,
            extendedData: D,
          }),
          A
        );
      })(F);
    } catch (_) {
      throw new A.RuntimeError('Invalid KTX2 file.');
    }
    if (0 !== M.layerCount)
      throw new A.RuntimeError('KTX2 texture arrays are not supported.');
    if (0 !== M.pixelDepth)
      throw new A.RuntimeError('KTX2 3D textures are unsupported.');
    var n = M.dataFormatDescriptor[0],
      i = new Array(M.levelCount);
    return (
      0 !== M.vkFormat || (163 !== n.colorModel && 166 !== n.colorModel)
        ? (e.push(F.buffer),
          (function (R, A) {
            var O,
              e =
                R.vkFormat === T.VK_FORMAT_R8G8B8_SRGB
                  ? t.PixelFormat.RGB
                  : t.PixelFormat.RGBA;
            R.vkFormat === T.VK_FORMAT_R8G8B8A8_UNORM
              ? (O = t.PixelDatatype.UNSIGNED_BYTE)
              : R.vkFormat === T.VK_FORMAT_R16G16B16A16_SFLOAT
              ? (O = t.PixelDatatype.HALF_FLOAT)
              : R.vkFormat === T.VK_FORMAT_R32G32B32A32_SFLOAT &&
                (O = t.PixelDatatype.FLOAT);
            for (var K = 0; K < R.levels.length; ++K) {
              var M = {};
              A[K] = M;
              for (
                var F = R.levels[K].levelData,
                  B = R.pixelWidth >> K,
                  n = R.pixelHeight >> K,
                  i = B * n * t.PixelFormat.componentsLength(e),
                  C = 0;
                C < R.faceCount;
                ++C
              ) {
                var V,
                  G = F.byteOffset + i * R.typeSize * C;
                (V =
                  _.defined(O) && 1 !== t.PixelDatatype.sizeInBytes(O)
                    ? 2 === t.PixelDatatype.sizeInBytes(O)
                      ? new Uint16Array(F.buffer, G, i)
                      : new Float32Array(F.buffer, G, i)
                    : new Uint8Array(F.buffer, G, i)),
                  (M[a[C]] = {
                    internalFormat: e,
                    datatype: O,
                    width: B,
                    height: n,
                    levelBuffer: V,
                  });
              }
            }
          })(M, i))
        : (function (R, O, e, T, K, M) {
            var F,
              B,
              n = new T.KTX2File(R),
              i = n.getWidth(),
              C = n.getHeight(),
              V = n.getLevels(),
              G = n.getHasAlpha();
            if (((G = !0), !(i > 0 && C > 0 && V > 0)))
              throw (
                (n.close(), n.delete(), new A.RuntimeError('Invalid KTX2 file'))
              );
            var r = O.dataFormatDescriptor[0],
              U = T.transcoder_texture_format;
            if (163 === r.colorModel)
              if (e.etc)
                (F = G
                  ? t.PixelFormat.RGBA8_ETC2_EAC
                  : t.PixelFormat.RGB8_ETC2),
                  (B = G ? U.cTFETC2_RGBA : U.cTFETC1_RGB);
              else if (e.etc1)
                (F = t.PixelFormat.RGB_ETC1), (B = U.cTFETC1_RGB);
              else if (e.s3tc)
                (F = G ? t.PixelFormat.RGBA_DXT5 : t.PixelFormat.RGB_DXT1),
                  (B = G ? U.cTFBC3_RGBA : U.cTFBC1_RGB);
              else if (e.pvrtc)
                (F = G
                  ? t.PixelFormat.RGBA_PVRTC_4BPPV1
                  : t.PixelFormat.RGB_PVRTC_4BPPV1),
                  (B = G ? U.cTFPVRTC1_4_RGBA : U.cTFPVRTC1_4_RGB);
              else if (e.astc)
                (F = t.PixelFormat.RGBA_ASTC), (B = U.cTFASTC_4x4_RGBA);
              else {
                if (!e.bc7)
                  throw new A.RuntimeError(
                    'No transcoding format target available for ETC1S compressed ktx2.',
                  );
                (F = t.PixelFormat.RGBA_BC7), (B = U.cTFBC7_RGBA);
              }
            else if (166 === r.colorModel)
              if (e.astc)
                (F = t.PixelFormat.RGBA_ASTC), (B = U.cTFASTC_4x4_RGBA);
              else if (e.bc7) (F = t.PixelFormat.RGBA_BC7), (B = U.cTFBC7_RGBA);
              else if (e.s3tc)
                (F = G ? t.PixelFormat.RGBA_DXT5 : t.PixelFormat.RGB_DXT1),
                  (B = G ? U.cTFBC3_RGBA : U.cTFBC1_RGB);
              else if (e.etc)
                (F = G
                  ? t.PixelFormat.RGBA8_ETC2_EAC
                  : t.PixelFormat.RGB8_ETC2),
                  (B = G ? U.cTFETC2_RGBA : U.cTFETC1_RGB);
              else if (e.etc1 && !G)
                (F = t.PixelFormat.RGB_ETC1), (B = U.cTFETC1_RGB);
              else {
                if (!e.pvrtc)
                  throw new A.RuntimeError(
                    'No transcoding format target available for UASTC compressed ktx2.',
                  );
                (F = G
                  ? t.PixelFormat.RGBA_PVRTC_4BPPV1
                  : t.PixelFormat.RGB_PVRTC_4BPPV1),
                  (B = G ? U.cTFPVRTC1_4_RGBA : U.cTFPVRTC1_4_RGB);
              }
            if (!n.startTranscoding())
              throw (
                (n.close(),
                n.delete(),
                new A.RuntimeError('startTranscoding() failed'))
              );
            for (var N = 0; N < O.levels.length; ++N) {
              var S = {};
              (M[N] = S), (i = O.pixelWidth >> N), (C = O.pixelHeight >> N);
              var o = n.getImageTranscodedSizeInBytes(N, 0, 0, B.value),
                s = new Uint8Array(o),
                L = n.transcodeImage(s, N, 0, 0, B.value, 0, -1, -1);
              if (!_.defined(L))
                throw new A.RuntimeError('transcodeImage() failed.');
              K.push(s.buffer),
                (S[a[0]] = {
                  internalFormat: F,
                  width: i,
                  height: C,
                  levelBuffer: s,
                });
            }
            n.close(), n.delete();
          })(F, M, B, o, e, i),
      i
    );
  }
  function L(_) {
    (o = _).initializeBasis(), (self.onmessage = e(s)), self.postMessage(!0);
  }
  return function (R) {
    var A = R.data.webAssemblyConfig;
    if (_.defined(A))
      return require([A.modulePath], function (R) {
        if (!_.defined(A.wasmBinaryFile))
          return R().then(function (_) {
            L(_);
          });
        _.defined(R) || (R = self.MSC_TRANSCODER),
          R(A).then(function (_) {
            L(_);
          });
      });
  };
});
