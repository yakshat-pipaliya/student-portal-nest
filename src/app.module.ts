import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ProfileModule } from './profile/profile.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
      ServeStaticModule.forRoot({
      rootPath: '/var/www/html/profile',
      serveRoot: '/uploads/profile',
    }),
    MongooseModule.forRoot('mongodb+srv://pipaliyayakshat:74wpEPgI9qRwSbIF@nestjs-crud.9fpkn1c.mongodb.net/student-portal', {
      connectionFactory: (connection) => {
        console.log("connected to mongodb");
        return connection;
      },
    }),
    UserModule,
    CourseModule,
    AttendanceModule,
    ProfileModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
