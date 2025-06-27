import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
      import { v4 as uuidv4 } from 'uuid';

      @Entity({
        name: "cd_ai",
        synchronize: false,
      })
      export class CdAiModel {
      
      }
      