-- Set Starter pack to Rs 1 for testing / launch promo.
UPDATE packages
SET price_label = 'Rs 1', amount_inr = 1
WHERE LOWER(name) = 'starter';
