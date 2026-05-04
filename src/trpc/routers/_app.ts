import { router } from '@/trpc/init';
import { partsRouter } from '@/modules/parts-inventory/server/procedures';

export const appRouter = router({
  parts: partsRouter
});

export type AppRouter = typeof appRouter;
