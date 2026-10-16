export type MediaAsset = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

export const BRAND = {
  "wordmark-stacked-ink": {
    "src": "/media/brand/wordmark-stacked-ink.png",
    "width": 815,
    "height": 392
  },
  "wordmark-stacked-bone": {
    "src": "/media/brand/wordmark-stacked-bone.png",
    "width": 815,
    "height": 392
  },
  "monogram-ink": {
    "src": "/media/brand/monogram-ink.png",
    "width": 208,
    "height": 166
  },
  "monogram-bone": {
    "src": "/media/brand/monogram-bone.png",
    "width": 208,
    "height": 166
  },
  "wordmark-inline-ink": {
    "src": "/media/brand/wordmark-inline-ink.png",
    "width": 565,
    "height": 76
  },
  "wordmark-inline-bone": {
    "src": "/media/brand/wordmark-inline-bone.png",
    "width": 565,
    "height": 76
  },
  "signature-ink": {
    "src": "/media/brand/signature-ink.png",
    "width": 428,
    "height": 154
  },
  "signature-bone": {
    "src": "/media/brand/signature-bone.png",
    "width": 428,
    "height": 154
  },
  "monogram-ring-ink": {
    "src": "/media/brand/monogram-ring-ink.png",
    "width": 221,
    "height": 223
  },
  "monogram-ring-bone": {
    "src": "/media/brand/monogram-ring-bone.png",
    "width": 221,
    "height": 223
  }
} as const satisfies Record<string, MediaAsset>;

export const WORK = {
  "crystal-standing": {
    "src": "/media/work/crystal-standing.webp",
    "width": 1024,
    "height": 1536,
    "blurDataURL": "data:image/webp;base64,UklGRsYAAABXRUJQVlA4ILoAAACwBQCdASoUAB4APxl+uFQsqCWjKAqpkCMJQBaHXga0Qd4J31LmZwHu1df21LGidMVttCz9NAAA/mw3UxfVDVSYxCnVlaqGCV/kU1edsEUaWriDXOCLH2ChTGDDuRz11qVNHqG9ggt+kWbZLI5SfHgMgGVa5Mwe4Y/rmVzi2r4zo+vl0aJyBRNUNjIqZVO/miHIyusnxRQd/NB35CZNtqkY/CxOyzp8LLTtnOdbW5viOMk4P3oQGWIeAAA="
  },
  "crystal-seated": {
    "src": "/media/work/crystal-seated.webp",
    "width": 1373,
    "height": 1145,
    "blurDataURL": "data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAACwBACdASoUABEAPxmEulYsqCWjqAgBkCMJQBdgAbisq24pXgNhCLz/t7tXl/OAAP65+H9EdEtiXt+Gs9hFSI+PSxt15yb1Cw5yGlVBiHlnanaUC7zil2JnoQX669lDk/KUpdtWFxzoq2QLKwH0u/s3N6zxji0hyyuaId/vTZ4nKD5zA9HQAAAA"
  },
  "crystal-arms-folded": {
    "src": "/media/work/crystal-arms-folded.webp",
    "width": 1374,
    "height": 1145,
    "blurDataURL": "data:image/webp;base64,UklGRqIAAABXRUJQVlA4IJYAAADQBACdASoUABEAPxmEuVYsqCWjqAgBkCMJYwC1G1XBok6m5eJUXOv5uYyk/li4AAD4Jf7Mw7XsIiPy/vv8UY0O52nfyDKfn+p5SZI3Avisexsj7rA4jDFJpvzHRBhd8pgC5iPOoSlbyjqMXNIL59rddFWSZUwji92oN0dVApbRSZfYp88MdxQAYVTe/n0qQ9P1afVIAAA="
  },
  "crystal-at-desk": {
    "src": "/media/work/crystal-at-desk.webp",
    "width": 1374,
    "height": 1145,
    "blurDataURL": "data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAABwBACdASoUABEAPxmCuFYsqCUjqAgBkCMJYwAAJsTLERM2lfWVYLBMSYGqyAD2JbRRCZAD9AcDYlxPadERWOsBqvMIPAFuObnd2bZCnpwcpjmi+k7wG5/2VdfuHCMQyHuKNYRZw1nB2lrI3OF5Pchysou9vwM3HYudfZLt4c5I9oqQhZoClTGPAAA="
  },
  "crystal-poised": {
    "src": "/media/work/crystal-poised.webp",
    "width": 1374,
    "height": 1145,
    "blurDataURL": "data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAAAQBACdASoUABEAPxmEuVYsqCWjqAgBkCMJQAACkoCWOfoZ/DWm+Z51QAD2JbRRCZADy0t1rQvFziiGbDel6qby3kaUGe3+UKV0RTdloPAZs94qOE77OablOmzENS5rSgWrSSU/HP2Ohi5ptwa/MhyMI12LvoQR9mIV7Uu3dq0EoB/Bwfoa1UcwQwAAAA=="
  },
  "crystal-recording": {
    "src": "/media/work/crystal-recording.webp",
    "width": 1374,
    "height": 1145,
    "blurDataURL": "data:image/webp;base64,UklGRqoAAABXRUJQVlA4IJ4AAACQBACdASoUABEAPxmEuVYsqCWjqAgBkCMJQBYdgXN9lstQhZL+tHdjhEdw5kgA/eIUciMJLjM+RLtGWH8sEWm19wxpISK93++Fsu8xd9kHIHB/Q/7N67tJ8T/mYInnTWjuhxtZKXC0r2Dc1zQ3SZX9DiKsfBZM+G2gluz3pfRgcfPScvHy2s/tyMJ9dMuzpAjmMa1SkV9Vp0zo8G9AAA=="
  },
  "earth-house-approach": {
    "src": "/media/work/earth-house-approach.webp",
    "width": 1024,
    "height": 1024,
    "blurDataURL": "data:image/webp;base64,UklGRq4AAABXRUJQVlA4IKIAAABwBACdASoUABQAPxmCuFYsqCUjqAgBkCMJYwCdMwnBBQ3lcoImrNRTb5vQAADNdobq4p4zwc2A3emMy7jvvueUlIq7bfnMUQU348uYUuX7fGf4Jhu9wCyC+L0uv0G0Kftzi1pBVu4kziwWpFFDJnRy3yRD+KsivxV1qQd5MSHznq6I3lYKt2WCSQAHj35t+z5FFcoVQzx1PilCyrApfpLAAAA="
  },
  "earth-house-courtyard": {
    "src": "/media/work/earth-house-courtyard.webp",
    "width": 867,
    "height": 1080,
    "blurDataURL": "data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAABQBQCdASoUABkAPxl+t1QsqCWjKAqpkCMJYgCdM1YOAA6eVlUw8Lmcq7kUkG9aYWFP1wAA+2uAjoHJLo2Cdi4ERsX9hMME9YfYdHRVPq6rwdaJbH0n1ZYw7s4QZd0p8iay0d45x7E4nzR4Ljw8g/Pp8HfA9Duok62/ERqMYICBMEkkgAWdAAAA"
  },
  "earth-house-threshold": {
    "src": "/media/work/earth-house-threshold.webp",
    "width": 890,
    "height": 1080,
    "blurDataURL": "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAACQBACdASoUABgAPxmCuFYsqCUjqAgBkCMJYwC+SBEYXVt8biYofGiiiCLBzwAA/uLUiZ/iZHcAmVOMkrp1MzAOLPj3WLEYaNNk70bT8+scsUKnxj6srW8klVkA5Iu4HTa4rhLZZhxC7WAVLP2v7yKa0N9S6JQsYCL3LKUAAAA="
  },
  "earth-house-bedroom": {
    "src": "/media/work/earth-house-bedroom.webp",
    "width": 980,
    "height": 1080,
    "blurDataURL": "data:image/webp;base64,UklGRqAAAABXRUJQVlA4IJQAAADwBACdASoUABYAPxmAs1UsqCQjKAqpkCMJYwC7BAgAp/Vu0MNynD8IsueLQDiYAAAA/qXeJFxphTw5TiCbPqpNI3/oC/Ir7yNRAUBBqLweAyLRnJ+l47DBiz2FIfckSQ0ms+vWIlybB0wr8tI+LDGVjf5g63VrsZbLKM+KSkrN/gSXSTfmvnpXBE5+KakNXdYQAAAA"
  },
  "earth-house-living": {
    "src": "/media/work/earth-house-living.webp",
    "width": 867,
    "height": 1080,
    "blurDataURL": "data:image/webp;base64,UklGRrYAAABXRUJQVlA4IKoAAAAQBQCdASoUABkAPxl8slMsp6QiqA1RkCMJYgCdM47BfbmCq3GO0u6swBuAlXT3P78AAP0nEnE6vtprADOrSCKmPo+TOPOsJ01Hg2B2crMTi6qE2A5fgxGCgPdqd0sG2iYO7au4kaiD6vsOgd6NALj4dmYQHIsq13XTnZoLhILDm77ntx9epp3ArAEZxVe4/KSzDBkpNmKcFGlNdTjTGNSddM0TEItD/gAAAA=="
  },
  "earth-house-veranda": {
    "src": "/media/work/earth-house-veranda.webp",
    "width": 892,
    "height": 1080,
    "blurDataURL": "data:image/webp;base64,UklGRqAAAABXRUJQVlA4IJQAAADQBACdASoUABgAPxmAtFUsqCSjKAqpkCMJQBOgAagl/0W16kY7+pwG33UXx9gQAAD+cbZ5qj47NncAJC3z1bvcq/cHgRFhgJbXHG79sVZxyfpddhDlfQ4Y6cSbt1j09siJOHHfQTF3522XrY7yF8b22DIGf/GypwoVQnxOUWIgimxOHIdoaX6QlM8fOAGCOynIXoAA"
  },
  "earth-house-garden": {
    "src": "/media/work/earth-house-garden.webp",
    "width": 892,
    "height": 1080,
    "blurDataURL": "data:image/webp;base64,UklGRqQAAABXRUJQVlA4IJgAAABQBQCdASoUABgAPxl+uVQsqCYjKAqpkCMJQBadAiNmoV9m167/WSrgNoAo9zOAH2UqrQAA/oF0wozSfnubJzsx3+FUhKj29ZalFkpbrk/S7+Wi1AAIN/aflWQDMZO39jfFUcLwJEps2DyNMulutUBWQbEk7FFUZ1s3PNJVd9YkuePx9iYcOFsQmgwn2HNe1P2xf3eBiZwAAA=="
  },
  "nature-home-street": {
    "src": "/media/work/nature-home-street.webp",
    "width": 1080,
    "height": 1440,
    "blurDataURL": "data:image/webp;base64,UklGRsgAAABXRUJQVlA4ILwAAADQBACdASoUABsAPxl+uFQsqCWjKAqpkCMJZgC7L8CATXeLjgYBRJDrDoqv6lJAAAD3zQfEqg7+jENInpl4TgMWPEsS/CsCVHRFVYO9cqop/tTf8lz8jFOsV9v3Q+Bu1UZ1+ZGWjxUFhh9YMY16MFZ0sMUZfGv2cHpVAkfhAQibm+bAby+SmEWe5McmnlEAgevmLqtm3+yiFiJ28GcrtMm3j9plvReeRzhj3rBThKKmFy4YGsgBVaPEagAAAA=="
  },
  "nature-home-tree-shade": {
    "src": "/media/work/nature-home-tree-shade.webp",
    "width": 804,
    "height": 1080,
    "blurDataURL": "data:image/webp;base64,UklGRrgAAABXRUJQVlA4IKwAAADQBACdASoUABsAPxl8uVQsp6YjKAqpkCMJZADG9Avv9tweCFNYsB9SaT8+SWDhiAD5tag7DDhU0PlFAPM+3ErF/Q1nnZzUKPRXxBIJgEMIDBB8YTGlutpCablQh0D9fBsGeeTD89q2l+fd/Hslr+hXGtuKRsfEVcWwHRoPhXS1AWkTTnNrAYJ3nyR7UfHfAzIazPQ3P0zIbaBSwibjXxZj1Mb98srFjp6nAAAA"
  },
  "nature-home-cantilever": {
    "src": "/media/work/nature-home-cantilever.webp",
    "width": 809,
    "height": 1080,
    "blurDataURL": "data:image/webp;base64,UklGRsIAAABXRUJQVlA4ILYAAACQBQCdASoUABsAPxl+uVQsqCYjKAqpkCMJZgCo9y6qoghbasm8s/9YxQrcNFz/NR4QGGlnwAD8UosbPEYy43CYI9dX7ywy0cCsMuw4q5RbpEWDdzqz357+AV22IaOli3ckVi7mt+soy6CcmpFYTG1ScxQQLpn76TaUFN2Ao/x07SuZdfCmggMQGVoxjxVWTsLKmhKih0TguRdBvul6n2DlyX5XzV2ni3H9gLd+g+YarUuigiOAAA=="
  },
  "nature-home-back-garden": {
    "src": "/media/work/nature-home-back-garden.webp",
    "width": 795,
    "height": 1062,
    "blurDataURL": "data:image/webp;base64,UklGRv4AAABXRUJQVlA4IPIAAADQBQCdASoUABsAPxl8tFKsp6SisBgIAZAjCWIAwzcwI6AFLdW1W6rpxeso5sY0FLW8hP4LRuhQAP5VLa9CZymCM4GEuYfoEYaT+ROmlSxJvJ3PsyhTMePxB7siOo/ke5F7IgSj7aF/6y6jE81ykx3ad+N7NMNrZJRszlQvNeA5mN7n3VT0M3YBJEgMsT1Rv3fXM2SjtD5zdb7WrpotQL4tpL2h7vEeghcGnEkQtMDayrZC+tk3FuHq5pNd8J1WuBQVXvy/Y8MqBvFsPfKLe1tCTPxmuV7OKu9NEJyUU9em60LY9b4N2B4Dq0rJHaOi0cAAAA=="
  },
  "nature-home-sitting-room": {
    "src": "/media/work/nature-home-sitting-room.webp",
    "width": 950,
    "height": 1440,
    "blurDataURL": "data:image/webp;base64,UklGRqAAAABXRUJQVlA4IJQAAACQBACdASoUAB4APxl4slCspySisAgBkCMJZQDDNAjq6CYYMl//Ufm0vkBiXgAA97KeZkikV/bEv9wJsfQBKD67+qvst6gkQaR1FHhky5GmQfFy0ro5uBB1hG0X2t9RgqA06P3G5Hpu1nrAGtbUnLRLHg/aV4OL5ReOP44DNbYCR5t5+IdyCuA94QxzzJHZ6ZVJUAAA"
  },
  "nature-home-bedroom": {
    "src": "/media/work/nature-home-bedroom.webp",
    "width": 805,
    "height": 1078,
    "blurDataURL": "data:image/webp;base64,UklGRroAAABXRUJQVlA4IK4AAABQBQCdASoUABsAPxl4tVOspqUisBgIAZAjCWYAsR6AAOeNE3XtUrKaoY1UcwsfVC8vEAAA99t3vDA0GHG/kKJWoBxP7HZdFKFzq/XWRtxfjAcfSJy3gtIwNMUQa30VNpM7SVJCC+wqVXK2F7PF9myaZSBSGmB3BTZvHEMFfJXMA89RkhDzHfB4A1g3CmD0TrNEZh9O15LCrsOi+4o3NK3M5SXCrRtzQfqAYcAAAAA="
  },
  "nature-home-screen": {
    "src": "/media/work/nature-home-screen.webp",
    "width": 809,
    "height": 1078,
    "blurDataURL": "data:image/webp;base64,UklGRsgAAABXRUJQVlA4ILwAAAAwBQCdASoUABsAPxl4s1Csp6SisAgBkCMJaACdMoR+AB8DSUNWn04RQsSTFZKaWBEIAAD85+7b30oDvIj2RFatN7VsgGc1A0CoLHNfQJI3Iz9gVQ6PlMJiPqxi3+UiBqyMQi7M23ChM9iC72obLlccvAoeRkq2qIlPXrywXfpfwuSPywoEnurMhrbDv4XoLZgl16T6hk86LeETcL9o6bHrWvjcRRG3Xdl+yEbY1GiQVm0LewciEjHfoaAAAA=="
  },
  "nature-home-atrium": {
    "src": "/media/work/nature-home-atrium.webp",
    "width": 828,
    "height": 1270,
    "blurDataURL": "data:image/webp;base64,UklGRqwAAABXRUJQVlA4IKAAAADwBACdASoUAB8APxmAtVUsqCSjKAqpkCMJYwAAInCcylO0Br0DS3hcreMoi2xMqwAA/qU1Zs1u2dJRn4+Inwxf9hIQ0ARHkGbvBvI4D1xZwr9B5YXVw0d5BxBlYe7gO+5xQu2qtOY0DWHFmPWmaZbLzFdvDOY3got8LaNhI7hSx/xnsVIx2EQOWl43E77O3Z11jiynNMWBQcW/JeQ1smAA"
  },
  "nature-home-stair": {
    "src": "/media/work/nature-home-stair.webp",
    "width": 768,
    "height": 1024,
    "blurDataURL": "data:image/webp;base64,UklGRqgAAABXRUJQVlA4IJwAAABwBQCdASoUABsAPxmAs1KsqKSisBgIAZAjCWYAnTLHQM4VG8vzl1PS0xxJvv9fqVvel1EgAPqR2mKYuiM3Vv6vYsS2dh0xnR83yLYQT3UsuqzGChgWacW0kTIQBVMw+WzpAtSKIpR7Be1a9+HiEOdlEKGXjRCT4X8sgY0g8+46wmcUv2eKyafgN+b1G2D0eEQS2BZLiGloWxI4AAA="
  },
  "nature-home-detail": {
    "src": "/media/work/nature-home-detail.webp",
    "width": 768,
    "height": 1024,
    "blurDataURL": "data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAAAwBQCdASoUABsAPxmAtVSsqCSjKAqpkCMJQBe6AifpOxE1+7hjbVbzkoyHkv7srBmpAAD+mR+mBNQR7kK0J36P60fyIeEyGCzn4r0ddV06yFK7VCywIt6s2euJt04K58kOldLcBGvxquY4ohACWcVQ4tF5+DydV1X8q9RJo/WQQGOKAiH4EDiIIMvonAAA"
  },
  "nature-home-dining": {
    "src": "/media/work/nature-home-dining.webp",
    "width": 768,
    "height": 1024,
    "blurDataURL": "data:image/webp;base64,UklGRtoAAABXRUJQVlA4IM4AAACQBQCdASoUABsAPxl4slEsp6SisAgBkCMJZADIyvIDKtr1YxpGcGn0TK8t4aVe/6dgK1LSeAD+tdvUmjtp51c7QKQ32Eoc2f/3n5e+0N6O3tCZrv0MKbpUwwwmr/k1jx0twU9koLYO3GZH/O6ZZ+eP5D4oKQhM6zy0bg5eAAmha4EkGynzJ/dZMlHYqo3oCT5s9KVu6EkFkpd7aERhQpbO+ZAAA0i8jjrgfxkcDRYEqxkmvAmwIxolV1+9vVsutYXtcb6/a+Xu6ilYaq6AAA=="
  },
  "nature-home-lounge": {
    "src": "/media/work/nature-home-lounge.webp",
    "width": 1022,
    "height": 1363,
    "blurDataURL": "data:image/webp;base64,UklGRrAAAABXRUJQVlA4IKQAAADwBACdASoUABsAPxl6tVMsp6UisBgIAZAjCWIAqPQHhQCCwx+4dKfWcskzrhUSAGAA/VAX+MRTwto+E2AKFJstkvh05k0YuGmRIkOkrcbaHE2Q83tBmSS76/A5Z4Xk6eAIenidgMrNTt5/EN9lNDUEV1lDY05HSCJUwvsU2hqPbMczof0M48Uk3yKPP8lnrjtsHhcOqPnn6punO3n0IXF87xFgAA=="
  },
  "nature-home-kitchen": {
    "src": "/media/work/nature-home-kitchen.webp",
    "width": 959,
    "height": 1440,
    "blurDataURL": "data:image/webp;base64,UklGRq4AAABXRUJQVlA4IKIAAADQBACdASoUAB4APxl+uVQsqCYjKAqpkCMJQBhmhcBoRWdmfIOtqosqT5w79/QAAADdabX3ZKcAvndYHie2VRa4zLHBHcWnsKa19EiBKwiF+ysZLpOIEP41aS4F7SLgrMIPmSNATBLwZIGjXv3qWnfIPTgauxsZvdU8yCa4NnXaoqrDPverwo8QVmCgyzRIpmUayj10KFoNcOWe19su2tp1QAA="
  },
  "kasa-kofo-elevation": {
    "src": "/media/work/kasa-kofo-elevation.webp",
    "width": 2200,
    "height": 1648,
    "blurDataURL": "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAAAQBACdASoUAA8APxl0sVCspqSisAgBkCMJYgCdMoADM1DZCuxDs9ViAADdRIUoNng6UV4UIQzWDZStOnQ1x/HFXkb9tvUeEYSc05ugTjl0N94ZDM6zHNiAkWOote/w8l66oAKJNA2ZLZIw6XdkhtbVNIsF0xagJLQBRwAA"
  },
  "kasa-kofo-assembly": {
    "src": "/media/work/kasa-kofo-assembly.webp",
    "width": 2000,
    "height": 2500,
    "blurDataURL": "data:image/webp;base64,UklGRroAAABXRUJQVlA4IK4AAABQBQCdASoUABkAPxmCuFYsqCUjqAgBkCMJQBWEJAArMlmu24zH95VA3vcsmislKtK+LgAA/p6MITL0lqrnCMmq0IrSsAuRU6cKvyqGRS5siJbbKzcEfUDtseGBbWO5SxekK7y/CqXC/PWyZRuv4i440s0K7M/oqihVE9W7pujaZeZ9Jc7Lsq80nML3Ni3xL1lHUbCK2cG8zC+I0IQ3aQz0GQLK15gWVpqCxZrgAAA="
  },
  "kasa-kofo-canopy": {
    "src": "/media/work/kasa-kofo-canopy.webp",
    "width": 1800,
    "height": 1800,
    "blurDataURL": "data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAADwBACdASoUABQAPxl+tlSsp6SjKAqpkCMJQBYdgiJuNoZRzaa9Gaq8u3x5zjQNusAA/rjbk7Saowb+cWRCU/RES0OJMzP6zksRhkGyd6NtViLaVvP2ysiSVIc2A3PTA3k9k3G+Ge7upBnZWnRzVTHIhhaHX+3PR3gAAA=="
  },
  "kasa-kofo-workshop": {
    "src": "/media/work/kasa-kofo-workshop.webp",
    "width": 1800,
    "height": 2249,
    "blurDataURL": "data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAACQBACdASoUABkAPxmCt1YsqCUjqAgBkCMJQBhmgY53x+nc0+mOwW5UL9ss5UAA/p75VPuUzMwCFhccJAFb5kFtWARGGjXKbnTRr4zP6l2J7mPcq9blnHmdzHMMQiRI+CrQ0P5PD1MnMvKxSPkIoGvteD8/GCPQAAAAAA=="
  },
  "kasa-kofo-library": {
    "src": "/media/work/kasa-kofo-library.webp",
    "width": 1800,
    "height": 2400,
    "blurDataURL": "data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAABwBACdASoUABsAPxl+uVQsqCYjKAqpkCMJZQCvDAXLqROtusExJB/RsoqwAAD+y6ZtXmiaOJ/SrzI1rLBlpRlhePhCMjlmD4iLJf0EXhp2PcHM+t1Z2cgz3SZo6xP5fPWzQVq22pgH7cwFMRI+QGHydSgi5fJy8I3GPTW6UzAG31wgITfZgmtGpISAAA=="
  }
} as const satisfies Record<string, MediaAsset>;

export type BrandKey = keyof typeof BRAND;
export type WorkKey = keyof typeof WORK;
