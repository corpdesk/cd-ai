import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
      import { v4 as uuidv4 } from 'uuid';

      @Entity({
        name: "cd_ai_usage_logs",
        synchronize: false,
      })
      export class CdAiUsageLogsModel {
      
      }
      