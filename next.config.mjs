/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone"
};

export default nextConfig;

BigInt.prototype.toJSON = function() {
    return this.toString()
} 