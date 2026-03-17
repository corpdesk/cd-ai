// src/CdCli/app/cd-ai/controllers/cd-ai.controller.ts

import { CdAiService } from '../services/cd-ai.service.js';
import { CdAiPromptRequest, CdAiPromptResponse } from '../models/cd-ai.model.js';
import { QueueWatcherService } from '../services/queue-watcher.service.js';
import { BudgetGuardService } from '../services/budget-guard.service.js';
import { AiServiceRegistry } from '../services/cd-ai-registry.service.js';
import CdLog from '../../../sys/cd-comm/controllers/cd-logger.controller.js';

export class CdAiController {
  //   static async initAiRuntime(): Promise<void> {
  //     console.log('[cd-ai] Initializing AI runtime...');
  //     await QueueWatcherService.start();
  //     BudgetGuardService.start();
  //   }

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
