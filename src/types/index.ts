export interface UserProvider {
  linked_at?: string;
  provider?: string;
  provider_id?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "buyer" | "viewer" | "customer" | "company_admin";
  company_id?: string;
  city?: string;
  country?: string;
  created_at?: string;
  email_2fa_enabled?: boolean;
  first_name?: string;
  last_login?: string;
  last_name?: string;
  postal_code?: string;
  provider?: string;
  providers?: UserProvider[];
  role_id?: number;
  two_factor_enabled?: boolean;
  updated_at?: string;
  user_id?: string;
  is_linked_to_company?: boolean;
}

export interface Address {
  id: string;
  box?: string;
  city?: string;
  company?: string;
  country?: string;
  created_at?: string;
  email?: string;
  is_default?: boolean;
  name?: string;
  number?: string;
  owner_id?: string;
  owner_type?: string;
  phone?: string;
  postal_code?: string;
  recipient_name?: string;
  street?: string;
  updated_at?: string;
}

export interface Company {
  id: string;
  bce_number?: string;
  billing_address_id?: string;
  created_at?: string;
  email?: string;
  is_active?: boolean;
  name?: string;
  phone?: string;
  updated_at?: string;
  vat_number?: string;
  website?: string;
}

export interface AuthResponse {
  token?: string;
  expires_at?: string;
  requires_2fa?: boolean;
  "2fa_id"?: string;
  additionalProp1?: Record<string, any>;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  name?: string;
  phone?: string;
}

export interface RegisterBusinessRequest {
  name: string;
  email: string;
  password: string;
  company_name: string;
  vat_number: string;
  street: string;
  number: string;
  postal_code: string;
  city: string;
  country: string;
  sector?: string;
  company_size?: string;
  box?: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Product {
  id: string;
  name: string | Record<string, string>;
  description: string | Record<string, string>;
  sku: string;
  price: number;
  currency?: string;
  category_id?: string;
  inventory_count?: number; // legacy
  stock?: number; // new inventory
  images?: string[]; // legacy
  image_urls?: string[]; // new
  score?: number;
  cost?: number;
  created_at?: string;
  default_language?: string;
  description_ai_generated_at?: string;
  description_ai_language?: string;
  description_ai_tone?: string;
  description_ai_version?: number;
  has_variants?: boolean;
  is_active?: boolean;
  low_stock_threshold?: number;
  tags?: string[];
  updated_at?: string;
  vendor_id?: string;
  weight?: number;
}

export interface CreateProductRequest {
  name: string | Record<string, string>;
  description: string | Record<string, string>;
  sku: string;
  price: number;
  currency?: string;
  category_id: string;
  inventory_count?: number;
  stock?: number;
  images?: string[];
  image_urls?: string[];
  cost?: number;
  vendor_id?: string;
  low_stock_threshold?: number;
  weight?: number;
  tags?: string[];
}

export interface CartItem {
  product_id: string;
  quantity: number;
  price?: number;
  total?: number;
  name?: string;
  image?: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total_amount: number;
  totalItems?: number;
  totalPrice?: number;
}

export interface AddToCartRequest {
  product_id: string;
  quantity: number;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
  total?: number; // UI helper
  name?: string;
  image_url?: string;
  vendor_id?: string;
}

export interface Order {
  id: string;
  status: string; // "pending_payment" | "paid" | "shipped" | "delivered" | "cancelled" | "processing"
  total: number; // legacy
  total_amount?: number; // new
  items: OrderItem[];
  created_at: string;
  po_number?: string;
  shipping_method?: string;
  billing_address?: Address;
  shipping_address?: Address;
  currency?: string;
  discounts?: number;
  order_date?: string;
  payment_method?: string;
  payment_status?: string;
  tracking_number?: string;
  user_id?: string;
  vat_amount?: number;
}

export interface CreateOrderRequest {
  shipping_method?: string;
  po_number?: string;
  billing_address?: Address;
  shipping_address?: Address;
  payment_method?: string;
}

export interface InviteUserRequest {
  email: string;
  role: "admin" | "buyer" | "viewer";
}

export interface QuoteItemRequest {
  product_id: string;
  quantity: number;
}

export interface CreateQuoteRequest {
  items: QuoteItemRequest[];
  notes?: string;
  company_id?: string;
  valid_until?: string;
}

export interface QuoteItem {
  discount_percent?: number;
  list_price?: number;
  name?: string;
  offered_price?: number;
  product_id?: string;
  quantity?: number;
}

export interface QuoteHistory {
  changed_at?: string;
  changed_by?: string;
  status?: string;
}

export interface QuoteNote {
  author_id?: string;
  content?: string;
  created_at?: string;
  is_internal?: boolean;
}

export interface Quote {
  id: string;
  status: string; // "draft" | "submitted" | "approved" | "rejected" | "converted" | "negotiating"
  total_estimated?: number; // legacy
  total_amount?: number; // new
  approved_by?: string;
  company_id?: string;
  created_at?: string;
  created_by?: string;
  currency?: string;
  history?: QuoteHistory[];
  items?: QuoteItem[];
  notes?: QuoteNote[] | string; // Handle legacy string vs new array
  rejection_reason?: string;
  updated_at?: string;
  user_id?: string;
  valid_until?: string;
}

export interface GenerateDescriptionRequest {
  product_name: string;
  features?: string[];
  tone?: string;
  language?: string;
  product_id?: string;
  product_data?: string;
  category?: string;
  keywords?: string[];
}

export interface GeneratedDescriptionResponse {
  description: string;
  tags: string[];
}

export interface DemandForecast {
  confidence_max?: number;
  confidence_min?: number;
  date?: string;
  predicted_sales?: number;
}

export interface ForecastResponse {
  product_id: string;
  current_stock?: number;
  forecast_next_30_days?: number; // legacy
  recommendation?: "restock_immediately" | "reorder_soon" | "sufficient_stock"; // legacy
  confidence_score?: number; // legacy
  category_id?: string;
  forecast?: DemandForecast[];
  generated_at?: string;
  horizon_days?: number;
  model_used?: string;
}

export interface SendPeppolInvoiceRequest {
  order_id: string;
}

export interface PeppolResponse {
  message?: string;
  document_id?: string;
  status?: string; // "processing" | "sent" | "failed"
  amount?: number;
  compliance?: string;
  peppol_format?: string;
  recipient_id?: string;
  sent_at?: string;
  ubl_generated?: boolean;
}

export interface VisualSearchRequest {
  image_base64?: string;
  image_url?: string;
}

export interface VisualSearchResponse {
  search_id: string;
  matches: Product[];
}

export interface VoiceCommandRequest {
  audio_blob_base64: string;
}

export interface VoiceIntentResponse {
  intent: "search" | "add_to_cart" | "status" | "unknown";
  entities: Record<string, any>;
  text: string;
}

export interface FraudScoreResponse {
  score: number; // 0-100
  risk_level: "low" | "medium" | "high" | "critical";
  reasons: string[];
}

export interface OptimizationRequest {
  orders: string[]; // Order IDs
}

export interface RouteOptimizationResponse {
  route_id: string;
  estimated_distance: number;
  stops: any[];
}

// --- New Swagger Types ---

export interface NotificationCampaign {
  campaign_id?: string;
  created_at?: string;
  name?: string;
  scheduled_at?: string;
  segment?: string;
  status?: string;
  type?: string;
}

export interface CompanyMetric {
  company_name?: string;
  total_spent?: number;
}

export interface AdminSummary {
  ai_responses_count?: number;
  growth?: number;
  mrr?: number;
  pending_orders?: number;
  products_low_stock?: number;
  recent_fraud_alerts?: number;
  sales_by_category?: Record<string, number>;
  system_health?: Record<string, string>;
  top_companies?: CompanyMetric[];
  total_orders?: number;
  total_products?: number;
  total_sales_amount?: number;
  total_users?: number;
}

export interface Shipment {
  carrier?: string;
  created_at?: string;
  eta?: string;
  last_update?: string;
  order_id?: string;
  shipment_id?: string;
  status?: string;
  tracking_number?: string;
}

export interface Vendor {
  address_city?: string;
  address_country?: string;
  address_postal_code?: string;
  address_street?: string;
  commission_rate?: number;
  created_at?: string;
  description?: string;
  email?: string;
  id?: string;
  kyc_status?: string;
  logo_url?: string;
  name?: string;
  phone?: string;
  rating?: number;
  registration_number?: string;
  review_count?: number;
  status?: string;
  updated_at?: string;
  vat_number?: string;
}

export interface VendorPayout {
  amount?: number;
  created_at?: string;
  payout_id?: string;
  period?: string;
  status?: string;
  vendor_id?: string;
}

export interface VendorProduct {
  approval_status?: string;
  commission_override?: number;
  created_at?: string;
  product_id?: string;
  updated_at?: string;
  vendor_id?: string;
}

export interface VendorReview {
  buyer_id?: string;
  comment?: string;
  created_at?: string;
  rating?: number;
  review_id?: string;
  vendor_id?: string;
}

export interface VendorDashboardResponse {
  average_rating?: number;
  payouts?: VendorPayout[];
  pending_products?: number;
  products?: VendorProduct[];
  reviews?: VendorReview[];
  total_revenue?: number;
  vendor_details?: Vendor;
}

export interface InventoryMovement {
  created_at?: string;
  location_id?: string;
  movement_id?: string;
  movement_type?: string;
  processed_by?: string;
  product_id?: string;
  quantity_change?: number;
  reference_id?: string;
  timestamp?: string;
}

export interface LowStockAlert {
  alert_level?: string;
  current_stock?: number;
  days_until_out_of_stock?: number;
  generated_at?: string;
  predicted_demand?: number;
  product_id?: string;
  sku?: string;
}

export interface RecommendContext {
  device?: string;
  location?: string;
  request_id?: string;
  session_id?: string;
  timestamp?: string;
}

export interface Recommendation {
  algorithm?: string;
  confidence?: number;
  context?: RecommendContext;
  product_id?: string;
  reason?: string;
  score?: number;
}

export interface RecommendationResponse {
  algorithm?: string;
  cache_hit?: boolean;
  generated_at?: string;
  recommendations?: Recommendation[];
  request_id?: string;
  user_id?: string;
}

export interface VisualSearchHistory {
  category_id?: string;
  image_url?: string;
  is_favorite?: boolean;
  query_vector?: number[];
  result_ids?: string[];
  search_at?: string;
  search_id?: string;
  search_term?: string;
  user_id?: string;
}

export interface VoiceConversationEntry {
  audio_retention_days?: number;
  audio_url?: string;
  intent?: any;
  response?: any;
  session_id?: string;
  speaker?: string;
  text?: string;
  timestamp?: string;
  user_hashed_id?: string;
}

export interface CatalogueAnalysisResult {
  catalogue_id?: string;
  confidence_score?: number;
  costs?: any;
  metadata?: any;
  peppol_xml_url?: string;
  processing_time_ms?: number;
  products?: Product[];
  products_extracted?: number;
}

export interface SubCategory {
  id: string;
  parent_id: string;
  slug: string;
  is_active: boolean;
  name: Record<string, string>;
  description: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  slug: string;
  is_active: boolean;
  sub_categories?: SubCategory[];
  name: Record<string, string>;
  description: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}