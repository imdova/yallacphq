import * as db from "@/lib/db/promo-codes";
import type { PromoCode, CreatePromoCodeInput, UpdatePromoCodeInput } from "@/types/promo";

export async function fetchPromoCodes(): Promise<PromoCode[]> {
  return db.fetchPromoCodes();
}

export async function getPromoCodeById(id: string): Promise<PromoCode | null> {
  return db.getPromoCodeById(id);
}

export async function createPromoCode(data: CreatePromoCodeInput): Promise<PromoCode> {
  return db.createPromoCode(data);
}

export async function updatePromoCode(id: string, data: UpdatePromoCodeInput): Promise<PromoCode | null> {
  return db.updatePromoCode(id, data);
}

export async function deletePromoCode(id: string): Promise<boolean> {
  return db.deletePromoCode(id);
}
