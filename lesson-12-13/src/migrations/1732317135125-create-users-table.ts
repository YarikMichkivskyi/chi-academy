import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1732317135125 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment"},
                    {name: "user", type: "varchar", length: "50", isNullable: false},
                    {name: "email", type: "varchar", isNullable: false},
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
