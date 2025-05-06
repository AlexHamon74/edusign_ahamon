<?php

namespace App\Controller\Admin;

use App\Entity\UserLesson;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Filter\EntityFilter;

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
            ChoiceField::new('isPresent')
            ->setLabel('Présence')
            ->setChoices([
                'Présent' => 1,
                'Absent' => 0,
            ])
            ->renderAsBadges([
                true => 'success',
                false => 'danger',
            ]),
        ];
    }
    public function configureFilters(Filters $filters): Filters
    {
        return $filters
            ->add(EntityFilter::new('lesson')->setLabel('Cours'));
    }
}
