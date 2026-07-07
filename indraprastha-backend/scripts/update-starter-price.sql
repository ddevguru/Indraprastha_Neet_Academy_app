-- Set Starter pack price to Rs 999.
UPDATE packages
SET price_label = 'Rs 999', amount_inr = 999
WHERE LOWER(name) = 'starter';
