// src/CdCli/app/cd-ai/controllers/cd-ai.controller.ts

import { CdAiService } from '../services/cd-ai.service';
import { CdAiPromptRequest, CdAiPromptResponse } from '../models/cd-ai.model';
import { QueueWatcherService } from '../services/queue-watcher.service';
import { BudgetGuardService } from '../services/budget-guard.service';
import { AiServiceRegistry } from '../services/cd-ai-registry.service';
import CdLog from '../../../sys/comm/controllers/cd-logger.controller';

export class CdAiController {

  /**
   * Initializes the AI runtime environment, including starting the queue watcher and initializing all registered AI services.
   * Also checks the budget status of each service and logs warnings if budgets are low.
   * This method should be called once during application startup to ensure the AI runtime is ready to handle requests.
   */
  static async initAiRuntime(): Promise<void> {
    console.log('[cd-ai] Initializing AI runtime...');
    await QueueWatcherService.start();

    const services = AiServiceRegistry.getAllServices();
    for (const service of services) {
      await service.init();
      const budget = await service.getBudgetStatus();

      if (budget.remaining < 10) {
        CdLog.warning(`[${service.name}] Budget running low!`);
      } else {
        CdLog.debug(
          `[${service.name}] Budget OK. Remaining: ${budget.remaining}`,
        );
      }
    }

    BudgetGuardService.start(); // if it still serves general monitoring
  }

  static async prompt(req: CdAiPromptRequest): Promise<CdAiPromptResponse> {
    return await CdAiService.sendPrompt(req);
  }
}
