<?php

namespace App\Controller\Admin;

use App\Entity\UserLesson;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class UserLessonCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return UserLesson::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            AssociationField::new('user')->setLabel('Élève'),
            AssociationField::new('lesson')->setLabel('Cours'),
        ];
    }
}
